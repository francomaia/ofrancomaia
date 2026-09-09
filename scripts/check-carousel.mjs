import { openBrowser } from '@remotion/renderer';

const browser = await openBrowser('chrome');
try {
  const page = await browser.newPage({ context: undefined, logLevel: 'error', indent: false, pageIndex: 0, onBrowserLog: null, onLog: () => {} });
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto({ url: 'http://localhost:3000/', timeout: 30000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (const id of ['trabalhos', 'branding']) {
      for (const progress of [0, 0.5, 1, 0.5]) {
        await page.evaluate(({ id, progress }) => {
          const stage = document.querySelector(`#${id} .carousel-stage`);
          const sticky = stage.querySelector('.carousel-sticky');
          const start = window.scrollY + stage.getBoundingClientRect().top - parseFloat(getComputedStyle(sticky).top);
          window.scrollTo({ top: start + progress * (stage.offsetHeight - sticky.offsetHeight), behavior: 'instant' });
        }, { id, progress });
        await new Promise(resolve => setTimeout(resolve, 150));
        const result = await page.evaluate((id) => {
          const stage = document.querySelector(`#${id} .carousel-stage`);
          const windowEl = stage.querySelector('.carousel-window');
          const sticky = stage.querySelector('.carousel-sticky');
          return { actual: windowEl.scrollLeft / (windowEl.scrollWidth - windowEl.clientWidth), stickyTop: sticky.getBoundingClientRect().top, expectedTop: parseFloat(getComputedStyle(sticky).top), transform: stage.querySelector('.carousel-group > *').style.transform };
        }, id);
        console.log(JSON.stringify({ width, id, progress, ...result }));
        if (Math.abs(result.actual - progress) > 0.015 || Math.abs(result.stickyTop - result.expectedTop) > 3) throw new Error('Scroll fora de sincronia');
      }
    }
  }
} finally { await browser.close({ silent: true }); }
