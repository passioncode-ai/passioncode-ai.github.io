// Copied from the SITE-039 run; serve a checkout with `python3 -m http.server`, set PLAYWRIGHT_CORE to playwright-core 1.63.
// Viewport screenshots (JPEG) in WebKit. Usage: node shots.cjs <base> <outdir> <prefix> <spec...>
// spec = path@width[@scrollSelector][@full]
const { webkit } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core')
const [base, outdir, prefix, ...specs] = process.argv.slice(2)
;(async () => {
  const browser = await webkit.launch()
  for (const spec of specs) {
    const [path, w, sel, full] = spec.split('@')
    const width = +w
    const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto(base + path, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    if (sel && /^\d+$/.test(sel)) await page.evaluate(n => window.scrollTo(0, n), +sel)
    else if (sel) await page.evaluate(s => { const e = document.querySelector(s); if (e) window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 90) }, sel)
    await page.waitForTimeout(150)
    const name = `${prefix}-${path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'en'}-${width}${sel ? '-' + sel.replace(/[^a-z0-9]/gi, '') : ''}${full ? '-full' : ''}.jpg`
    await page.screenshot({ path: `${outdir}/${name}`, type: 'jpeg', quality: 55, fullPage: !!full })
    console.log(name)
    await ctx.close()
  }
  await browser.close()
})()
