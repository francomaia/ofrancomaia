/**
 * Captura as telas do site (versão celular, 2x) para o brand reel vertical.
 *
 * Gera em `public/reel-brand/`:
 *  - `tela-<nome>.png` — viewport 390 × 844 em pontos-chave da página;
 *  - `branding-senna.png` — topo de uma página de projeto de branding.
 *
 * Uso: node scripts/capture-brand-reel.mjs   (REEL_SITE_URL troca o endereço)
 */
import { openBrowser } from '@remotion/renderer';
import { mkdir, writeFile } from 'node:fs/promises';

const destination = new URL('../public/reel-brand/', import.meta.url);
const siteUrl = (process.env.REEL_SITE_URL || 'https://ofrancomaia.com').replace(/\/$/, '');
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const shoot = async (name) => {
    const {
      value: { data },
    } = await page._client().send('Page.captureScreenshot', { format: 'png' });
    await writeFile(new URL(`${name}.png`, destination), Buffer.from(data, 'base64'));
    console.log(`  ${name}`);
  };

  const prepare = async () => {
    await wait(1500);
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      await document.fonts.ready;
      for (const img of document.querySelectorAll('img')) img.loading = 'eager';
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
      // botões flutuantes atrapalham a leitura no vídeo
      for (const el of document.querySelectorAll('.back-to-top, [aria-label*="WhatsApp" i]')) {
        el.style.display = 'none';
      }
    });
  };

  /** Rola até um ponto do elemento: `frac` = fração da altura dele. */
  const scrollTo = async (selector, frac = 0) => {
    await page.evaluate(
      (sel, f) => {
        const el = document.querySelector(sel);
        if (!el) throw new Error(`Ausente: ${sel}`);
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + el.offsetHeight * f, behavior: 'instant' });
      },
      selector,
      frac,
    );
    await wait(1600);
  };

  await page.goto({ url: `${siteUrl}/?reel=1`, timeout: 60000 });
  await prepare();
  await shoot('tela-hero');
  await scrollTo('#branding', 0);
  await shoot('tela-branding-titulo');
  await scrollTo('#branding .carousel-stage', 0.18);
  await shoot('tela-branding-carrossel');
  await scrollTo('#branding .carousel-stage', 0.5);
  await shoot('tela-branding-carrossel-2');
  await scrollTo('#web .carousel-stage', 0.22);
  await shoot('tela-web-carrossel');
  await scrollTo('#sobre', 0.05);
  await shoot('tela-sobre');
  await scrollTo('#servicos', 0.32);
  await shoot('tela-servicos');
  await scrollTo('#contato', 0.18);
  await shoot('tela-contato');

  await page.goto({ url: `${siteUrl}/branding/senna.html`, timeout: 60000 });
  await prepare();
  await shoot('branding-senna');
  await page.evaluate(() => window.scrollTo({ top: 420, behavior: 'instant' }));
  await wait(1500);
  await shoot('branding-senna-2');
} finally {
  await browser.close({ silent: true });
}
