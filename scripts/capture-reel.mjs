/**
 * Captura o material do reel a partir do site rodando.
 *
 * Gera dois tipos de imagem:
 *
 *  1. `<formato>-pagina.png` — a página inteira numa tira alta. É ela que o
 *     Remotion desliza dentro do quadro do dispositivo para o site rolar de
 *     verdade, em vez de cortar entre telas paradas.
 *  2. `<formato>-<secao>.png` — cada seção no tamanho da viewport, para os
 *     cards do bento.
 *
 * Uso: pnpm motion:capture   (com o site rodando em localhost:3000)
 */
import { openBrowser } from '@remotion/renderer';
import { mkdir, writeFile } from 'node:fs/promises';

const destination = new URL('../public/reel/', import.meta.url);
const siteUrl = process.env.REEL_SITE_URL || 'http://localhost:3000/';

const SECTIONS = [
  'inicio',
  'trabalhos',
  'branding',
  'sobre',
  'trajetoria',
  'servicos',
  'contato',
];

const FORMATS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

/**
 * O site anima ao rolar: as linhas de trajetória e serviços usam
 * `animation-timeline: view()` e começam quase invisíveis. Numa captura de
 * página inteira elas ficariam borradas e transparentes, porque nunca entraram
 * na viewport. Isto força o estado final e encurta o herói, que tem 180vh de
 * altura com conteúdo preso em sticky.
 */
const CAPTURE_MODE_CSS = `
  .editorial-hero { min-height: 100svh !important; }
  .reveal-character, .career-row, .service-row, .carousel-stage {
    animation: none !important;
    opacity: 1 !important;
    translate: none !important;
    scale: none !important;
    filter: none !important;
  }
  .back-to-top { display: none !important; }
  html { scroll-behavior: auto !important; }
`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Altura da tira e offset de cada seção, por formato. */
const mapa = {};

const browser = await openBrowser('chrome');
try {
  await mkdir(destination, { recursive: true });
  const page = await browser.newPage({
    context: undefined,
    logLevel: 'error',
    indent: false,
    pageIndex: 0,
    onBrowserLog: null,
    onLog: () => {},
  });

  const shoot = async (name, options) => {
    const {
      value: { data },
    } = await page._client().send('Page.captureScreenshot', {
      format: 'png',
      ...options,
    });
    await writeFile(new URL(`${name}.png`, destination), Buffer.from(data, 'base64'));
    return Buffer.from(data, 'base64').length;
  };

  for (const [format, width, height] of FORMATS) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto({ url: siteUrl, timeout: 60000 });
    await wait(2000);

    // Fontes e imagens precisam estar decodificadas antes de qualquer captura,
    // senão a tira sai com buracos.
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const img of document.querySelectorAll('img')) img.loading = 'eager';
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    });

    // --- seções, no tamanho da viewport ---
    for (const section of SECTIONS) {
      await page.evaluate((id) => {
        document.documentElement.style.scrollBehavior = 'auto';
        const el = document.getElementById(id);
        if (!el) throw new Error(`Seção ausente: ${id}`);
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
      }, section);
      await wait(700);
      const bytes = await shoot(`${format}-${section}`);
      console.log(`  ${format}-${section}  ${(bytes / 1024).toFixed(0)} KB`);
    }

    // --- página inteira, para o scroll contínuo ---
    const pageHeight = await page.evaluate((css) => {
      const style = document.createElement('style');
      style.id = 'modo-captura';
      style.textContent = css;
      document.head.append(style);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return document.documentElement.scrollHeight;
    }, CAPTURE_MODE_CSS);

    await wait(1200);

    // Onde cada seção começa dentro da tira. O Remotion usa isso para rolar
    // exatamente até ela, em vez de eu chutar coordenadas.
    mapa[format] = await page.evaluate((ids) => {
      const offsets = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        offsets[id] = el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0;
      }
      return { altura: document.documentElement.scrollHeight, secoes: offsets };
    }, SECTIONS);

    // O Chrome não rasteriza além de ~16384px de altura.
    const clipHeight = Math.min(pageHeight, 16000);
    if (pageHeight > clipHeight) {
      console.warn(`  aviso: página de ${pageHeight}px cortada em ${clipHeight}px`);
    }

    const bytes = await shoot(`${format}-pagina`, {
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: clipHeight, scale: 1 },
    });
    console.log(`  ${format}-pagina  ${width}x${clipHeight}  ${(bytes / 1024 / 1024).toFixed(1)} MB`);

    await page.evaluate(() => document.getElementById('modo-captura')?.remove());
  }

  for (const [format, width] of FORMATS) {
    mapa[format].largura = width;
    mapa[format].viewport = FORMATS.find(([f]) => f === format)[2];
  }
  await writeFile(
    new URL('mapa.json', destination),
    `${JSON.stringify(mapa, null, 2)}
`,
  );
  console.log('  mapa.json gravado');
} finally {
  await browser.close({ silent: true });
}
