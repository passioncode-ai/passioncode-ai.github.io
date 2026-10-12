// Copied from the SITE-039 run; serve a checkout with `python3 -m http.server`, set PLAYWRIGHT_CORE to playwright-core 1.63.
// Layout audit in WebKit: every page x locale x width. Measures, does not screenshot (disk).
// Usage: node audit.cjs <base> <out.json> [locales comma] [widths comma] [pages comma]
const { webkit } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core')
const fs = require('fs')
const [base, out, locArg, widthArg, pageArg] = process.argv.slice(2)
const LOCALES = (locArg || 'en,ru,de,fr,pl,ko,es,pt-br,zh-hans,ja').split(',')
const WIDTHS = (widthArg || '1440,1024,768,390,320').split(',').map(Number)
const PAGES = (pageArg || '/,vision/,start/,business/,business/thanks/,privacy/,switchboard/,switchboard/agents/,fabric/,fabric/agents/,inbox/,dashboards/,observatory/,design-system/,404.html').split(',')
const MEASURE = () => {
  const vw = document.documentElement.clientWidth
  const offenders = []
  const clipped = el => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(hidden|auto|scroll|clip)/.test(s.overflowX)) { const r = p.getBoundingClientRect(); if (r.right <= vw + 1) return true } } return false }
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('.skip-link,.legacy-anchor,[aria-hidden=true] svg,details:not([open]) > :not(summary)')) continue
    const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden' || s.position === 'fixed') continue
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue
    if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) offenders.push({ tag: el.tagName.toLowerCase(), cls: el.className && String(el.className).slice(0, 60), text: (el.innerText || '').trim().slice(0, 50), left: Math.round(r.left), right: Math.round(r.right) })
  }
  // text that overflows its own box (long words)
  const textOver = []
  for (const el of document.querySelectorAll('h1,h2,h3,h4,summary,.button,figcaption,th,td,label,strong,b')) {
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX === 'visible' && el.clientWidth > 0) textOver.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), text: el.innerText.trim().slice(0, 50), sw: el.scrollWidth, cw: el.clientWidth })
  }
  // small tap targets outside running text
  const small = []
  for (const el of document.querySelectorAll('a,button,summary,input,select,textarea')) {
    const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') continue
    if (el.closest('p,li > span,.hero-caption,.section-note,figcaption,td') && !el.closest('nav')) continue
    if (el.classList.contains('skip-link')) continue
    const r = el.getBoundingClientRect(); if (!r.width) continue
    if (r.height < 24 || r.width < 24) small.push({ tag: el.tagName.toLowerCase(), text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) })
  }
  const imgs = []
  for (const i of document.images) { const r = i.getBoundingClientRect(); if (!r.width || !i.naturalWidth) continue; const a = (r.width / r.height) / (i.naturalWidth / i.naturalHeight); if (Math.abs(a - 1) > 0.03 && getComputedStyle(i).objectFit === 'fill') imgs.push({ src: i.getAttribute('src'), ratio: +a.toFixed(3) }) }
  const h1 = document.querySelector('h1'); const hr = h1 && h1.getBoundingClientRect()
  const lh = h1 && parseFloat(getComputedStyle(h1).lineHeight)
  return { scrollWidth: document.documentElement.scrollWidth, bodyScroll: document.body.scrollWidth, vw, offenders: offenders.slice(0, 8), offenderCount: offenders.length, textOver: textOver.slice(0, 8), small: small.slice(0, 12), smallCount: small.length, imgs, h1: h1 && { text: h1.innerText.slice(0, 80), lines: Math.round(hr.height / lh), fontSize: getComputedStyle(h1).fontSize, bottom: Math.round(hr.bottom + scrollY) }, header: Math.round(document.querySelector('.site-header')?.getBoundingClientRect().height || 0), video: (() => { const v = document.querySelector('video'); if (!v) return null; const r = v.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) } })() }
}
;(async () => {
  const browser = await webkit.launch()
  const rows = []
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: 'reduce' })
    for (const locale of LOCALES) for (const p of PAGES) {
      const page = await ctx.newPage(); const errors = []
      page.on('pageerror', e => errors.push(String(e)))
      const url = `${base}/${locale === 'en' ? '' : locale + '/'}${p === '/' ? '' : p}`
      try { await page.goto(url, { waitUntil: 'load', timeout: 20000 }); await page.evaluate(() => document.fonts.ready); rows.push({ url: url.replace(base, ''), locale, width, errors, ...(await page.evaluate(MEASURE)) }) } catch (e) { rows.push({ url, locale, width, fail: String(e).slice(0, 200) }) }
      await page.close()
    }
    await ctx.close()
  }
  await browser.close()
  fs.writeFileSync(out, JSON.stringify({ engine: 'webkit ' + (browser.version ? browser.version() : ''), at: new Date().toISOString(), rows }, null, 1))
  const bad = rows.filter(r => r.fail || r.offenderCount || r.textOver?.length || r.errors?.length || r.imgs?.length)
  console.log('rows', rows.length, 'with findings', bad.length)
})()
