// SITE-049 browser check: the home page in 10 languages at 390, 768 and 1440 px on the local Worker
// (`npx wrangler dev --port 4199 --local-protocol https`). Writes webkit.json next to this file.
// Run from the repository root: node docs/evidence/2026-11-06-site-049/webkit-check.mjs
import { webkit } from 'playwright'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
const base = process.env.BASE || 'https://localhost:4199'
const langs = ['', 'ru/', 'de/', 'fr/', 'pl/', 'ko/', 'es/', 'pt-br/', 'zh-hans/', 'ja/']
const order = ['problem', 'shift', 'fabric-process', 'system', 'agents', 'grow', 'doors']
const browser = await webkit.launch()
const rows = []
for (const width of [390, 768, 1440]) {
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width, height: 900 } })
  for (const l of langs) {
    const page = await ctx.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(String(e)))
    // Playwright's own screenshot styles trip the CSP (style-src); they are not the site's.
    page.on('console', m => { if (m.type() === 'error' && !/style-src/.test(m.text())) errors.push(m.text()) })
    await page.goto(`${base}/${l}`, { waitUntil: 'load' })
    const r = await page.evaluate(order => {
      const vw = document.documentElement.clientWidth
      const nav = document.querySelector('header nav')
      const past = [...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > vw + 1)
      const ids = [...document.querySelectorAll('main section[id]')].map(s => s.id).filter(id => order.includes(id))
      const svg = document.querySelector('#agents svg')
      const list = document.querySelector('#agents .agents-list')
      return {
        docOverflow: document.documentElement.scrollWidth > vw,
        mainPastEdge: past.map(e => e.tagName.toLowerCase() + '.' + (e.className?.baseVal ?? e.className)).slice(0, 3),
        headerNavScrolls: nav ? nav.scrollWidth > nav.clientWidth : null,
        storyOrder: ids.join(' > '),
        doors: document.querySelectorAll('#doors .path-card').length,
        diagram: svg && getComputedStyle(svg).display !== 'none' ? 'svg' : (list && getComputedStyle(list).display !== 'none' ? 'list' : 'none'),
        h1: document.querySelectorAll('h1').length
      }
    }, order)
    rows.push({ width, lang: l.replace('/', '') || 'en', ...r, errors })
    await page.close()
  }
  await ctx.close()
}
await browser.close()
writeFileSync(resolve(import.meta.dirname, 'webkit.json'), JSON.stringify({ base, browser: 'Playwright webkit', rows }, null, 1) + '\n')
const bad = rows.filter(r => r.docOverflow || r.mainPastEdge.length || r.errors.length || r.doors !== 4 || r.h1 !== 1 || r.storyOrder !== order.join(' > ') || r.diagram !== (r.width < 600 ? 'list' : 'svg'))
for (const r of bad) console.log('FAIL', r.width, r.lang, JSON.stringify(r))
console.log(bad.length ? `FAIL: ${bad.length} of ${rows.length}` : `PASS: ${rows.length} of ${rows.length} (10 languages x 390, 768, 1440)`)
process.exit(bad.length ? 1 : 0)
