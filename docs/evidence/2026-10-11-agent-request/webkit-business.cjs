// WebKit (Safari's engine) pass of /business/ against a LOCAL Worker (wrangler dev --local
// --local-protocol https), never production. Usage:
//   PLAYWRIGHT_CORE=<path to playwright-core 1.63> node webkit-business.cjs https://localhost:8911 <outDir>
// Checks per language (en, ru) and width (390, 1280): no horizontal overflow, no broken image, no
// console error; the agent prompt sits ahead of the form; Copy puts the plain-text prompt on the
// clipboard (equal to /<lang>/business/agent-request.txt) and confirms; the short form sends and
// shows its reference. Then one run without JavaScript: the prompt is selectable text with no
// button, and the form posts to /api/leads and lands on the thanks page.
const { webkit } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core')
const fs = require('fs')
const [base, out] = process.argv.slice(2)
const sleep = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  const browser = await webkit.launch()
  const rows = []
  for (const locale of ['en', 'ru']) {
    for (const width of [390, 1280]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, ignoreHTTPSErrors: true, reducedMotion: 'reduce', locale })
      const page = await ctx.newPage()
      const errors = []
      page.on('pageerror', e => errors.push(String(e)))
      // Playwright's screenshot injects an inline <style> (caret hiding) that the site's CSP refuses;
      // probed 2026-10-11: no console error without a screenshot, one with. Counted apart.
      const SHOT_CSP = /^Refused to apply a stylesheet because its hash, its nonce, or 'unsafe-inline'/
      let screenshotCsp = 0
      page.on('console', m => { if (m.type() === 'error') { if (SHOT_CSP.test(m.text())) screenshotCsp++; else errors.push(m.text()) } })
      const path = `${locale === 'en' ? '' : `/${locale}`}/business/`
      await page.goto(base + path, { waitUntil: 'load' })
      await page.evaluate(() => document.fonts.ready)
      // Record what Copy hands the clipboard, whatever the page's clipboard permission.
      await page.evaluate(() => {
        window.__copied = null
        const original = navigator.clipboard?.writeText?.bind(navigator.clipboard)
        if (navigator.clipboard) navigator.clipboard.writeText = async text => { window.__copied = text; try { await original?.(text) } catch {} }
      })
      await page.locator('#request').scrollIntoViewIfNeeded()
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).length,
        agentFirst: document.querySelector('#agent-request').getBoundingClientRect().top <= document.querySelector('#lead-form').getBoundingClientRect().top,
        agentLeftOrAbove: document.querySelector('#agent-request').getBoundingClientRect().left <= document.querySelector('#lead-form').getBoundingClientRect().left,
        formFields: [...document.querySelectorAll('#lead-form [name]')].map(e => e.name)
      }))
      await page.screenshot({ path: `${out}/business-${locale}-${width}-request.jpg`, type: 'jpeg', quality: 70 })
      const button = page.locator('.copy-prompt')
      const before = await button.innerText()
      await button.click()
      await page.waitForFunction(() => window.__copied !== null)
      const copied = await page.evaluate(() => window.__copied)
      const after = await button.innerText()
      const txt = await (await ctx.request.get(`${base}${path}agent-request.txt`)).text()
      // The short form: what agents should do, the email, a goal; the token needs 3 s.
      await sleep(4000)
      await page.fill('[name="contact.message"]', locale === 'ru' ? 'Проверка в WebKit: хотим видеть, сколько стоит каждый агент.' : 'WebKit harness: we want to see what each agent costs and delivers.')
      await page.fill('[name="contact.email"]', `webkit-${locale}-${width}@example.com`)
      await page.selectOption('[name="goals"]', 'cost_and_results')
      await page.click('#lead-form [type="submit"]')
      await page.waitForSelector('.request-done', { timeout: 15000 })
      const done = await page.locator('.request-done').innerText()
      await page.screenshot({ path: `${out}/business-${locale}-${width}-sent.jpg`, type: 'jpeg', quality: 70 })
      const row = { locale, width, ...layout, screenshotCsp, copyButton: [before, after], copiedEqualsTxt: copied === txt, copiedChars: copied?.length, sent: /[0-9a-f]{8}-[0-9a-f]{4}-4/.test(done), consoleErrors: errors }
      row.pass = !row.overflow && row.brokenImages === 0 && row.agentFirst && row.agentLeftOrAbove && before !== after && row.copiedEqualsTxt && row.sent && errors.length === 0 &&
        JSON.stringify(row.formFields) === JSON.stringify(['form_token', 'pc_hp', 'contact.message', 'contact.email', 'goals'])
      rows.push(row)
      console.log(JSON.stringify(row))
      await ctx.close()
      await sleep(13000) // the local limiter allows 5 requests a minute per address
    }
  }
  // Without JavaScript.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 900 }, ignoreHTTPSErrors: true, javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto(base + '/business/', { waitUntil: 'load' })
  const noJs = { locale: 'en', width: 390, javascript: false, copyButtons: await page.locator('.copy-prompt').count(), promptVisible: await page.locator('#agent-prompt').isVisible(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) }
  await sleep(4000)
  await page.fill('[name="contact.message"]', 'No-JavaScript harness request.')
  await page.fill('[name="contact.email"]', 'webkit-nojs@example.com')
  await Promise.all([page.waitForURL(/\/business\/thanks\/\?ref=/), page.click('#lead-form [type="submit"]')])
  noJs.landed = new URL(page.url()).pathname
  noJs.pass = noJs.copyButtons === 0 && noJs.promptVisible && !noJs.overflow && noJs.landed === '/business/thanks/'
  rows.push(noJs)
  console.log(JSON.stringify(noJs))
  await browser.close()
  fs.writeFileSync(`${out}/webkit.json`, JSON.stringify({ engine: `WebKit ${browser.version ? '' : ''}(playwright-core 1.63.0, webkit-2359)`, base, checkedAt: new Date().toISOString(), rows, pass: rows.every(r => r.pass) }, null, 2) + '\n')
  console.log(rows.every(r => r.pass) ? 'PASS' : 'FAIL')
})().catch(e => { console.error(e); process.exit(1) })
