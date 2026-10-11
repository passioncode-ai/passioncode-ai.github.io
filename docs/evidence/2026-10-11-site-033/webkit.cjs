// WebKit check for SITE-033: /inbox/ (New in 0.15, For agents) and the /dashboards/ download card,
// en and ru, 390 and 1280 px. Usage: node webkit.cjs <base-url> <playwright-core dir> <out.json> [shots dir]
const [base, pwDir, out, shots] = process.argv.slice(2)
const { webkit } = require(pwDir)
const fs = require('fs')
;(async () => {
  const browser = await webkit.launch()
  const pages = []
  for (const path of ['/inbox/', '/ru/inbox/', '/dashboards/', '/ru/dashboards/']) {
    for (const width of [390, 1280]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      const res = await page.goto(base + path, { waitUntil: 'load' })
      const m = await page.evaluate(() => {
        const doc = document.documentElement
        const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), width: Math.round(r.width), height: Math.round(r.height) } }
        const out = { horizontalOverflowPx: Math.max(0, doc.scrollWidth - doc.clientWidth), brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length }
        const outside = [...document.querySelectorAll('main *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' }).length
        out.elementsOutsideViewport = outside
        const n = document.getElementById('new')
        if (n) {
          out.newSection = box(n)
          out.newIsFirstAfterHero = n.previousElementSibling && n.previousElementSibling.classList.contains('hero')
          out.newTitle = n.querySelector('h2').innerText.replace(/\n/g, ' / ')
          out.newCards = [...n.querySelectorAll('article h3')].map(h => h.innerText)
          const cols = new Set([...n.querySelectorAll('article')].map(a => Math.round(a.getBoundingClientRect().left)))
          out.newColumns = cols.size
          out.agentSteps = document.querySelectorAll('#agents .setup-steps li').length
          out.guideLink = !!document.querySelector('#agents a[href$="docs/agents/onboard.md"]')
          out.heroTitle = document.getElementById('hero-title').innerText.replace(/\n/g, ' / ')
        }
        const card = [...document.querySelectorAll('#download .download-card')].find(c => /\.deb/.test(c.innerText))
        if (card && location.pathname.includes('dashboards')) out.dashboardsUpdateLine = card.querySelector('p').innerText
        return out
      })
      if (shots) {
        const el = await page.$(path.includes('inbox') ? '#new' : '#download')
        if (el) await el.screenshot({ path: `${shots}/${path.replace(/\//g, '_').replace(/^_|_$/g, '')}-${width}.png` })
      }
      pages.push({ url: path, width, status: res.status(), ...m })
      await ctx.close()
    }
  }
  await browser.close()
  fs.writeFileSync(out, JSON.stringify({ what: `WebKit (Playwright webkit, playwright-core ${require(pwDir + '/package.json').version}) against the built dist/ served over local HTTP, branch agent/site-033, ${new Date().toISOString()}; reduced motion on`, pages }, null, 1) + '\n')
  console.log(pages.map(p => `${p.url} ${p.width} ${p.status} overflow=${p.horizontalOverflowPx} outside=${p.elementsOutsideViewport} broken=${p.brokenImages}${p.newColumns ? ' cols=' + p.newColumns : ''}`).join('\n'))
})().catch(e => { console.error(e); process.exit(1) })
