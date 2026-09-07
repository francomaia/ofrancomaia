import type { NextConfig } from 'next';

/**
 * O alvo precisa ser decidido aqui também, e não só no `vite.config.ts`:
 * `output: 'standalone'` vence a escolha de plugins, então deixá-lo fixo faria
 * o build de Cloudflare também gerar o servidor Node.
 */
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

const nextConfig: NextConfig = isCloudflare
  ? {}
  : // Gera `dist/standalone/server.js`: um servidor Node autocontido, que é o
    // formato que a Hostinger sabe executar.
    { output: 'standalone' };

export default nextConfig;
