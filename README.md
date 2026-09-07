# O Franco Maia, Portfólio

Site de página única em App Router rodando sobre [vinext](https://github.com/cloudflare/vinext) (Next.js sobre Vite). O alvo de build padrão é **Node**, para hospedagem na Hostinger.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

O site sobe em http://localhost:3000.

## Onde mexer

| O que | Arquivo |
| --- | --- |
| Projetos, branding, serviços, trajetória, links, textos fixos | `lib/site.ts` |
| Regras de validação do formulário | `lib/contact-schema.ts` |
| Recebimento e entrega dos leads | `app/api/contact/route.ts` |
| Layout do e-mail que chega na caixa de entrada | `lib/contact-email.ts` |
| Estilos | `app/globals.css` |

`lib/site.ts` é a fonte única: a página, os metadados, o JSON-LD e o sitemap leem tudo de lá. Para adicionar um projeto, basta acrescentar um item ao array. Ele aparece no carrossel **e** nos dados estruturados.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (ignorado pelo git) e preencha. Depois de editar o arquivo, **reinicie o dev server**, porque ele só lê as variáveis na inicialização.

| Variável | Para quê |
| --- | --- |
| `RESEND_API_KEY` | Envia o formulário por e-mail via [Resend](https://resend.com). Caminho principal. |
| `CONTACT_TO_EMAIL` | Destino dos leads. Sem isso, usa o e-mail de `lib/site.ts`. |
| `CONTACT_FROM_EMAIL` | Remetente. `onboarding@resend.dev` serve para testar; em produção, use um endereço de domínio verificado no Resend. |
| `CONTACT_WEBHOOK_URL` | Alternativa ao e-mail: encaminha o lead como JSON (Zapier, Make, n8n, Slack, Discord). |
| `NEXT_PUBLIC_SITE_URL` | URL pública. Alimenta canonical, Open Graph, `sitemap.xml` e `robots.txt`. |

Em produção, cadastre as mesmas chaves no painel da Hostinger (Node.js -> variáveis de ambiente). O servidor lê direto do `process.env`, sem precisar de arquivo.

### Como o formulário é entregue

A rota `POST /api/contact` tenta, nesta ordem:

1. **E-mail via Resend**, se `RESEND_API_KEY` existir. O `Reply-To` aponta para quem escreveu, então basta responder o e-mail.
2. **Webhook JSON**, se `CONTACT_WEBHOOK_URL` existir.
3. **Log no console**, apenas fora de produção.

Se nenhum canal estiver configurado em produção, a rota responde `503` em vez de fingir sucesso, e o formulário mostra Instagram e e-mail como alternativa, e nenhum contato se perde em silêncio.

Proteções da rota: validação no servidor (a mesma do cliente), campo isca contra bots e limite de 5 envios por IP a cada 10 minutos.

## Deploy na Hostinger (Node.js)

```bash
pnpm build:hostinger
```

Isso gera `dist/standalone/`: uma pasta autocontida com o servidor, o build, o
`public/` e o `node_modules/` já resolvido. Não é preciso rodar `npm install` no
servidor.

No hPanel da Hostinger:

1. **Node.js -> Criar aplicação.**
2. **Versão do Node:** 22 ou superior (o projeto declara `>=22.13.0`).
3. **Arquivo de inicialização:** `server.js`
4. Suba o **conteúdo** de `dist/standalone/` para a raiz da aplicação (não a
   pasta em si). Se for por upload de arquivo, compacte a pasta e descompacte lá.
5. **Variáveis de ambiente:** cadastre `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL` e `NEXT_PUBLIC_SITE_URL` (ver tabela acima).
6. Inicie a aplicação.

Dois detalhes que costumam morder:

- **`HOST`, não `HOSTNAME`.** O Next.js standalone usa `HOSTNAME` para o
  endereço de bind, mas o vinext usa `HOST` para não colidir com a variável que
  o Linux já define. O padrão é `0.0.0.0`, que serve para a Hostinger; só mexa
  se precisar.
- **`PORT`.** A Hostinger injeta a porta. O servidor a respeita, com `3000` como
  padrão.

`NEXT_PUBLIC_SITE_URL` é lida no build **e** em execução, então defina-a antes de
gerar o pacote para que canonical, Open Graph e sitemap saiam com o domínio
certo.

### Voltar para Cloudflare Workers

O alvo antigo continua disponível:

```bash
DEPLOY_TARGET=cloudflare pnpm build
```

## Qualidade

```bash
pnpm lint
pnpm format
```

O `components/ui/` é a biblioteca shadcn instalada pelo scaffold e traz avisos de lint próprios; o código do site vive em `app/` e `lib/`, que passam limpos.

## Movimento

O movimento é parte da identidade do site e roda para todo mundo: parallax do
hero, marquee, motivos flutuantes, brilho do CTA e as animações de entrada
presas ao scroll.

A única concessão a `prefers-reduced-motion: reduce` é a que já existia desde o
início: o carrossel de projetos perde a animação de entrada do palco. Vale
lembrar que no Windows essa preferência vem do interruptor
*Acessibilidade → Efeitos visuais → Efeitos de animação*, que muita gente
desliga por desempenho sem querer um site sem movimento, e por isso o site não
a usa para desligar mais nada.
