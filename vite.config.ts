import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig, type PluginOption } from 'vite';

/**
 * Alvo de deploy.
 *
 * `node` é o padrão e gera o servidor standalone em `dist/standalone`, que é o
 * que a Hostinger executa. `DEPLOY_TARGET=cloudflare` volta a produzir o Worker
 * da Cloudflare, com os bindings locais do wrangler.
 */
const target =
  process.env.DEPLOY_TARGET === 'cloudflare' ? 'cloudflare' : 'node';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const d1 = null;
const r2 = null;

// macOS Seatbelt bloqueia FSEvents, então previews no Codex precisam de polling.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [vinext()];

  // Plugin de preview do site-creator: serve para desenvolver, mas injeta um
  // fluxo de login de teste que não tem função no servidor de produção.
  if (command === 'serve') {
    const { sites } = await import('@openai/sites-vite-plugin');
    plugins.push(sites());
  }

  if (target === 'cloudflare') {
    // Mantém o estado do Wrangler e do Miniflare dentro do projeto. São ajustes
    // de ferramenta, não segredos; ambiente de aplicação vive em `.env*`.
    process.env.WRANGLER_WRITE_LOGS ??= 'false';
    process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
    process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

    // O Wrangler fotografa o caminho de log quando o plugin é importado.
    const { cloudflare } = await import('@cloudflare/vite-plugin');
    plugins.push(
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: localBindingConfig,
      }),
    );
  }

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins,
  };
});
