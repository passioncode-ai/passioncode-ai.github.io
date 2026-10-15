const { webkit } = require('playwright');
(async () => {
  const b = await webkit.launch();
  const out = [];
  for (const width of [1440, 390]) for (const path of ['/fabric/', '/ru/fabric/', '/ja/fabric/', '/de/fabric/']) {
    const ctx = await b.newContext({ viewport: { width, height: 900 }, ignoreHTTPSErrors: true, reducedMotion: 'reduce' });
    const page = await ctx.newPage(); const errors = [];
    page.on('pageerror', e => errors.push(String(e))); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    await page.goto('https://127.0.0.1:4173' + path, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const grid = document.querySelector('#download .download-grid');
      const cards = [...grid.querySelectorAll('.download-card')].map(c => { const b = c.getBoundingClientRect(); return { h: c.querySelector('h3').innerText, x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), right: Math.round(b.right) } });
      const links = [...document.querySelectorAll('#download a[href^="/fabric/download/"], #download a[href^="/"][href*="/fabric/download/"]')].map(a => a.getAttribute('href'));
      const over = [...document.querySelectorAll('#download *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).map(e => e.tagName + '.' + e.className).slice(0, 5);
      return { overflow: document.documentElement.scrollWidth > innerWidth, cards, links, over, hero: document.querySelector('.hero-actions a').innerText, caption: document.querySelector('.hero-caption').innerText };
    });
    await page.locator('#download').screenshot({ path: `./${path.replace(/\//g, '_')}${width}.png` });
    out.push({ width, path, errors, ...r });
    await ctx.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})();
