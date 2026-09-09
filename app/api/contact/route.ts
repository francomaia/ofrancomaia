import { buildContactEmail, type ContactMeta } from '@/lib/contact-email';
import {
  normalizeContact,
  validateContact,
  type ContactPayload,
} from '@/lib/contact-schema';
import { site } from '@/lib/site';

/**
 * Recebe o formulário de contato.
 *
 * Entrega, na ordem:
 *   1. E-mail via Resend, se `RESEND_API_KEY` estiver definido. É o caminho
 *      principal: o lead chega na caixa de entrada com `Reply-To` apontando
 *      para quem escreveu, então basta responder.
 *   2. Webhook JSON, se `CONTACT_WEBHOOK_URL` estiver definido (Zapier, Make,
 *      n8n, Slack, Discord).
 *   3. Log, apenas fora de produção.
 *
 * Em produção sem nenhum canal configurado respondemos 503 em vez de fingir
 * sucesso. O formulário então oferece Instagram e e-mail como alternativa.
 */

type RateEntry = { count: number; resetAt: number };

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;

// Por isolate. Não é um limite global forte, mas corta repetição trivial sem
// exigir infraestrutura extra. Para um limite real, migrar para KV/D1.
const rateBuckets = new Map<string, RateEntry>();
let nextPruneAt = 0;

function rateLimit(key: string, now: number): boolean {
  const entry = rateBuckets.get(key);
  if (!entry || entry.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return true;
  }
  if (entry.count >= RATE_LIMIT.max) return false;
  entry.count += 1;
  return true;
}

function pruneBuckets(now: number) {
  if (rateBuckets.size < 500 || now < nextPruneAt) return;
  nextPruneAt = now + 30_000;
  for (const [key, entry] of rateBuckets) {
    if (entry.resetAt <= now) rateBuckets.delete(key);
  }
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function sendEmail(payload: ContactPayload, meta: ContactMeta) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const { subject, text, html } = buildContactEmail(payload, meta);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ?? 'Portfólio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend respondeu ${response.status}: ${await response.text()}`,
    );
  }
  return true;
}

async function deliver(
  payload: ContactPayload,
  meta: ContactMeta,
): Promise<'email' | 'webhook' | 'log' | 'none'> {
  if (await sendEmail(payload, meta)) return 'email';

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        source: site.title,
        subject: `Novo contato de ${payload.name}`,
        ...payload,
        projectType: payload.projectType || 'Não informado',
        budget: payload.budget || 'Não informado',
        ...meta,
      }),
    });
    if (!response.ok) {
      throw new Error(`Webhook respondeu ${response.status}`);
    }
    return 'webhook';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(
      '[contato] lead recebido (nenhum canal de entrega configurado)',
      {
        ...payload,
        ...meta,
      },
    );
    return 'log';
  }

  return 'none';
}

export async function POST(request: Request) {
  const now = Date.now();
  pruneBuckets(now);

  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'desconhecido';

  if (!rateLimit(ip, now)) {
    return json(
      {
        ok: false,
        error: 'Muitas tentativas. Tente novamente em alguns minutos.',
      },
      429,
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'Corpo inválido.' }, 400);
  }

  if (typeof raw !== 'object' || raw === null) {
    return json({ ok: false, error: 'Corpo inválido.' }, 400);
  }

  const payload = normalizeContact(raw as Partial<ContactPayload>);

  // Honeypot: responde como sucesso para não dar feedback útil ao bot.
  if (payload.company) {
    return json({ ok: true, channel: 'discarded' }, 202);
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  try {
    const channel = await deliver(payload, {
      receivedAt: new Date(now).toISOString(),
      userAgent: request.headers.get('user-agent') ?? '',
      country: request.headers.get('cf-ipcountry') ?? '',
    });

    if (channel === 'none') {
      return json(
        {
          ok: false,
          error:
            'O envio automático está indisponível agora. Me chame no Instagram ou por e-mail.',
          fallback: { instagram: site.instagram, email: site.email },
        },
        503,
      );
    }

    return json({ ok: true, channel }, 200);
  } catch (error) {
    console.error('[contato] falha ao entregar lead', error);
    return json(
      {
        ok: false,
        error:
          'Não consegui enviar sua mensagem. Me chame no Instagram ou por e-mail.',
        fallback: { instagram: site.instagram, email: site.email },
      },
      502,
    );
  }
}

export function GET() {
  return json({ ok: false, error: 'Método não permitido.' }, 405);
}
