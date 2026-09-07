/**
 * Publica o app pronto na branch `deploy`, para a Hostinger puxar por Git.
 *
 * Por que uma branch separada: a Hostinger clona o repositório e roda o app,
 * sem instalar dependências nem compilar. A branch `main` guarda o código-fonte;
 * a `deploy` guarda o resultado de `vinext build` — `server.js`, o build, o
 * `public/` podado e o `node_modules/` já resolvido.
 *
 * A branch é montada num git worktree separado, então o seu diretório de
 * trabalho nunca é tocado.
 *
 * Uso: pnpm deploy
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const standalone = join(root, 'dist', 'standalone');
const worktree = join(root, '.deploy-worktree');
const BRANCH = 'deploy';

const git = (args, options = {}) =>
  execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.quiet ? 'pipe' : 'inherit',
    ...options,
  });

const gitIn = (dir, args) =>
  execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'inherit' });

function branchExists(name) {
  try {
    execFileSync(
      'git',
      ['show-ref', '--verify', '--quiet', `refs/heads/${name}`],
      {
        cwd: root,
        stdio: 'pipe',
      },
    );
    return true;
  } catch {
    return false;
  }
}

if (!existsSync(join(standalone, 'server.js'))) {
  console.error(
    'dist/standalone não existe. Rode `pnpm build:hostinger` antes.',
  );
  process.exit(1);
}

// Um worktree órfão anterior atrapalha; sempre recomeça limpo.
if (existsSync(worktree)) {
  try {
    git(['worktree', 'remove', '--force', worktree], { quiet: true });
  } catch {
    rmSync(worktree, { recursive: true, force: true });
  }
}
try {
  git(['worktree', 'prune'], { quiet: true });
} catch {}

console.log(`Preparando a branch ${BRANCH}...`);

if (branchExists(BRANCH)) {
  git(['worktree', 'add', worktree, BRANCH]);
} else {
  // Primeira vez: branch órfã, sem herdar o histórico do código-fonte.
  git(['worktree', 'add', '--detach', worktree]);
  gitIn(worktree, ['checkout', '--orphan', BRANCH]);
  gitIn(worktree, ['reset']);
}

// Esvazia o worktree, preservando os metadados do git.
for (const entry of readdirSync(worktree)) {
  if (entry === '.git') continue;
  rmSync(join(worktree, entry), { recursive: true, force: true });
}

// Copia o app pronto para a raiz da branch: a Hostinger espera `server.js` no
// primeiro nível.
for (const entry of readdirSync(standalone)) {
  cpSync(join(standalone, entry), join(worktree, entry), { recursive: true });
}

// `-f` porque `node_modules` costuma estar em gitignore globais, e aqui ele
// precisa ir junto: é o que dispensa o `npm install` no servidor.
gitIn(worktree, ['add', '-A', '-f', '.']);

const status = execFileSync('git', ['status', '--porcelain'], {
  cwd: worktree,
  encoding: 'utf8',
});

if (!status.trim()) {
  console.log('Nada mudou desde o último deploy.');
} else {
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
  gitIn(worktree, ['commit', '-m', `Build de produção — ${stamp}`]);
  console.log(`Commit criado na branch ${BRANCH}.`);
}

git(['worktree', 'remove', '--force', worktree], { quiet: true });

console.log('');
console.log(`Pronto. Agora envie a branch: git push origin ${BRANCH}`);
console.log('Na Hostinger, aponte o deploy por Git para essa branch.');
