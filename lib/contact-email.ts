import type { ContactPayload } from './contact-schema';
import { site } from './site';

export type ContactMeta = {
  receivedAt: string;
  userAgent: string;
  country: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  });
}

export function buildContactEmail(payload: ContactPayload, meta: ContactMeta) {
  const rows: [string, string][] = [
    ['Nome', payload.name],
    ['E-mail', payload.email],
    ['Tipo de projeto', payload.projectType || 'Não informado'],
    ['Investimento', payload.budget || 'Não informado'],
    ['Recebido em', formatDate(meta.receivedAt)],
  ];

  const text = [
    `Novo contato pelo site ${site.title}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Mensagem:',
    payload.message,
    '',
    `Responder: ${payload.email}`,
  ].join('\n');

  const html = `<!doctype html>
<html lang="pt-BR"><body style="margin:0;background:#0b0b0c;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f5f4">
  <div style="max-width:560px;margin:0 auto;background:#141416;border:1px solid #2a2a2e">
    <div style="padding:24px 28px;border-bottom:1px solid #2a2a2e">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#67e8f9">Novo contato</p>
      <h1 style="margin:8px 0 0;font-size:24px;line-height:1.15;letter-spacing:-.02em">${escapeHtml(payload.name)}</h1>
    </div>
    <table role="presentation" style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `<tr>
        <td style="padding:12px 28px;border-bottom:1px solid #232327;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8b8b93;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:12px 28px;border-bottom:1px solid #232327;font-size:14px;color:#f5f5f4">${escapeHtml(value)}</td>
      </tr>`,
        )
        .join('')}
    </table>
    <div style="padding:24px 28px">
      <p style="margin:0 0 10px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8b8b93">Mensagem</p>
      <p style="margin:0;font-size:15px;line-height:1.65;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
      <a href="mailto:${escapeHtml(payload.email)}" style="display:inline-block;margin-top:24px;background:#67e8f9;color:#050505;padding:12px 18px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none">Responder</a>
    </div>
  </div>
  <p style="max-width:560px;margin:16px auto 0;font-size:11px;color:#6b6b72">${escapeHtml(meta.country || 'n/d')} · ${escapeHtml(meta.userAgent.slice(0, 120))}</p>
</body></html>`;

  return {
    subject: `Novo contato: ${payload.name} (${payload.projectType || 'projeto'})`,
    text,
    html,
  };
}
