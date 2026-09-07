/**
 * Prepara `dist/standalone/` para subir na Hostinger.
 *
 * O `vinext build` já gera a pasta autocontida (servidor, build, `public/` e
 * `node_modules/`), mas escreve um `package.json` mínimo. O painel Node da
 * Hostinger espera um `package.json` com nome, versão, `engines` e um script
 * `start`, então este passo o completa.
 *
 * Uso: node scripts/prepare-hostinger.mjs
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const standalone = join(root, 'dist', 'standalone');

if (!existsSync(join(standalone, 'server.js'))) {
  console.error(
    'dist/standalone/server.js não existe. Rode `pnpm build` antes deste script.',
  );
  process.exit(1);
}

const source = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const target = join(standalone, 'package.json');
const current = JSON.parse(readFileSync(target, 'utf8'));

writeFileSync(
  target,
  `${JSON.stringify(
    {
      ...current,
      name: source.name,
      version: source.version,
      private: true,
      type: 'module',
      engines: source.engines,
      // A Hostinger usa este script para subir o app; `server.js` também serve
      // como "arquivo de inicialização" no painel.
      scripts: { start: 'node server.js' },
      // O `node_modules` já vai commitado, mas a Hostinger roda `install` antes
      // de subir e gerenciadores podam o que não está declarado. Declarar o
      // essencial faz o install restaurar em vez de quebrar. São só os pacotes
      // que `server.js` resolve em runtime; o resto vem por transitividade.
      dependencies: Object.fromEntries(
        ['vinext', 'react', 'react-dom']
          .filter((name) => source.dependencies?.[name])
          .map((name) => [name, source.dependencies[name]]),
      ),
    },
    null,
    2,
  )}\n`,
  'utf8',
);

/**
 * Remove do pacote de deploy os arquivos de `public/` que o build não
 * referencia. Só mexe na cópia dentro de `dist/`, nunca no `public/` do
 * projeto: se um arquivo voltar a ser usado, o próximo build o traz de volta.
 */
function pruneUnusedAssets() {
  // Duas cópias saem do build: `public/` e `dist/client/`. Podar só a primeira
  // não economiza nada, porque é da segunda que o servidor entrega os arquivos.
  const alvos = [
    join(standalone, 'public'),
    join(standalone, 'dist', 'client'),
  ].filter((base) => existsSync(join(base, 'assets')));
  if (alvos.length === 0) return { removidos: 0, bytes: 0 };

  // Procura no CÓDIGO-FONTE, não no build: o bundle do servidor carrega um
  // manifesto com todos os arquivos de `public/`, então buscar lá acharia até
  // o que ninguém usa.
  const haystack = [];
  const collect = (dir) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        collect(full);
      } else if (/\.(tsx?|jsx?|mjs|css|json|md)$/i.test(entry.name)) {
        haystack.push(readFileSync(full, 'utf8'));
      }
    }
  };
  for (const dir of ['app', 'lib', 'components', 'hooks']) {
    collect(join(root, dir));
  }
  const sources = haystack.join('\n');

  let removidos = 0;
  let bytes = 0;
  const walk = (dir, base) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, base);
        continue;
      }
      // O caminho como aparece no código-fonte, ex.: /assets/cases/exas.avif
      const publicPath = full.slice(base.length).split(sep).join('/');
      if (!sources.includes(publicPath)) {
        bytes += statSync(full).size;
        rmSync(full);
        removidos += 1;
      }
    }
  };
  for (const base of alvos) {
    walk(join(base, 'assets'), base);
  }
  return { removidos, bytes };
}

const podados = pruneUnusedAssets();
if (podados.removidos > 0) {
  console.log(
    `Removidos ${podados.removidos} arquivos não referenciados do pacote ` +
      `(${(podados.bytes / 1024 / 1024).toFixed(1)} MB). O public/ do projeto não foi tocado.`,
  );
}

console.log('dist/standalone/package.json preparado para a Hostinger.');
console.log('Suba o CONTEÚDO de dist/standalone/ para a raiz do app Node.');
console.log('Arquivo de inicialização: server.js');
console.log(`Node exigido: ${source.engines?.node ?? 'não declarado'}`);
