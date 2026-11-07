// Seek the paused composition timeline and screenshot frames (WebKit). Usage: node shot.cjs DIR OUT t1 t2 ...
const { webkit } = require(process.env.PW || 'playwright');
(async () => {
  const [dir, out, ...ts] = process.argv.slice(2);
  const b = await webkit.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.addInitScript(() => { window.__timelines = {}; });
  await p.goto('file://' + require('path').resolve(dir, 'index.html'));
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.fonts.ready);
  for (const t of ts) {
    await p.evaluate((t) => {
      const tt = Number(t);
      document.querySelectorAll('[data-start]').forEach(el => { if (el.id === 'root' || el.tagName === 'AUDIO') return;
        const s = +el.dataset.start, d = +el.dataset.duration; el.style.visibility = (tt >= s && tt < s + d) ? 'visible' : 'hidden'; });
      window.__timelines.main.seek(tt, false);
    }, t);
    await p.screenshot({ path: `${out}-${t}.png` });
  }
  await b.close();
})();
