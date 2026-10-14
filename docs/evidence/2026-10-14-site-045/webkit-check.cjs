const { webkit } = require('playwright-core')
const out = '.'
;(async () => {
  const browser = await webkit.launch()
  const results = []
  for (const locale of ['', 'ru/']) for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, permissions: [] })
    const page = await ctx.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(String(e)))
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    for (const route of ['', 'start/', 'fabric/', 'business/', 'vision/', 'fabric/agents/', 'design-system/', 'dashboards/']) {
      const url = `http://127.0.0.1:8790/${locale}${route}`
      await page.goto(url, { waitUntil: 'networkidle' })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      const copyButtons = await page.locator('.copy-button, .copy-prompt').count()
      const header = await page.locator('.header-download').getAttribute('href')
      const tag = `${locale || 'en/'}${route || 'home/'}`.replace(/\//g, '_') + width
      if (['', 'start/', 'fabric/', 'business/'].includes(route)) await page.screenshot({ path: `${out}/${tag}.png`, fullPage: true })
      results.push({ url, width, overflow, copyButtons, header })
    }
    // Home: transcript opens, For you copy works
    await page.goto(`http://127.0.0.1:8790/${locale}`, { waitUntil: 'networkidle' })
    await page.locator('.video-transcript summary').click()
    const transcriptOpen = await page.locator('.video-transcript').evaluate(d => d.open && d.querySelector('p').textContent.length)
    const card = page.locator('#start .copy-button')
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {})
    await card.click()
    const label = await card.textContent()
    // /start/: the hash opens the folded details
    await page.goto(`http://127.0.0.1:8790/${locale}start/#fabric`, { waitUntil: 'networkidle' })
    const byHandOpen = await page.locator('#by-hand').evaluate(d => d.open)
    await page.goto(`http://127.0.0.1:8790/${locale}start/`, { waitUntil: 'networkidle' })
    const pairColumns = await page.locator('.setup-pair').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length)
    const promptBtn = page.locator('#setup-agent .copy-prompt'); await promptBtn.click(); const promptLabel = await promptBtn.textContent()
    results.push({ locale: locale || 'en', width, transcriptOpen, copyLabel: label, byHandOpen, pairColumns, promptLabel, errors })
    await ctx.close()
  }
  await browser.close()
  require('fs').writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 1))
  console.log(JSON.stringify(results.filter(r => r.overflow > 0 || r.errors?.length || 'transcriptOpen' in r), null, 1))
})()
