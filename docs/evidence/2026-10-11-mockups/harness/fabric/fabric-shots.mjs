// node fabric-shots.mjs <outdir> [locale...]
import { webkit } from 'playwright'
import { writeFileSync } from 'node:fs'
const [out, ...locs] = process.argv.slice(2)
const locales = locs.length ? locs : ['en', 'ru']
const browser = await webkit.launch()
const L = {
  en: { skip: 'Skip', next: 'Next', create: 'Create an agent', adapt: 'Adapt an agent', choose: 'Choose…', name: 'release-notes-agent', purpose: 'Drafts release notes from merged pull requests' },
  ru: { name: 'release-notes-agent', purpose: 'Готовит заметки к релизу по слитым pull request' }
}
async function shot (page, name, locale) {
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${out}/${name}-${locale}.png` })
  writeFileSync(`${out}/${name}-${locale}.txt`, await page.evaluate(() => document.body.innerText))
  console.log('shot', name, locale)
}
for (const locale of locales) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light', reducedMotion: 'reduce', locale: locale === 'ru' ? 'ru-RU' : 'en-US' })
  const page = await ctx.newPage()
  page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text().slice(0, 200)) })
  page.on('pageerror', e => console.log('pageerror:', e.message))
  await page.goto(`http://127.0.0.1:5199/harness.html?locale=${locale}`, { waitUntil: 'load' })
  await page.waitForSelector('[data-launch-view="first-run"]', { timeout: 20000 })
  await shot(page, 'fabric-first-1', locale)
  // step 1 → 2: the primary button of the persona step
  await page.locator('.st-first-step .lp-actions .lp-button.primary').click()
  await page.waitForSelector('.st-exec')
  await shot(page, 'fabric-first-2', locale)
  await page.locator('.st-first-step .lp-actions .lp-button.primary').click()
  await page.waitForSelector('.st-pairs')
  await shot(page, 'fabric-first-3', locale)
  // Create an agent
  await page.locator('#st-card-agent').locator('xpath=..').locator('.lp-button').click()
  await page.waitForSelector('[data-launch-view="start-create-agent"]')
  await page.fill('#start-agent-name', L[locale].name ?? L.en.name)
  await page.fill('#start-agent-purpose', L[locale].purpose)
  await page.locator('[aria-labelledby="start-agent-where"] .lp-button').click()
  await page.waitForSelector('[aria-labelledby="start-agent-where"] code')
  await page.waitForSelector('.st-skills.ok')
  await page.evaluate(() => document.activeElement && document.activeElement.blur())
  await shot(page, 'fabric-create', locale)
  // back to the menu → Adapt
  await page.locator('[data-launch-view="start-create-agent"] .lp-heading button, [data-launch-view="start-create-agent"] header button').first().click()
  await page.waitForSelector('.st-pairs')
  await page.locator('#st-card-convert').locator('xpath=..').locator('.lp-button').click()
  await page.waitForSelector('[data-launch-view="start-convert"]')
  await page.locator('[data-launch-view="start-convert"] .lp-button.primary').click()
  await page.waitForSelector('.st-facts')
  await page.waitForSelector('.st-skills.ok')
  await page.evaluate(() => document.activeElement && document.activeElement.blur())
  await shot(page, 'fabric-adapt', locale)
  console.log('unknown bridge calls:', [...new Set(await page.evaluate(() => window.__unknownBridge))].join(', '))
  await ctx.close()
  for (const kind of ['create', 'adapt']) {
    const c2 = await browser.newContext({ viewport: { width: 1000, height: 625 }, deviceScaleFactor: 2.56, colorScheme: 'dark', reducedMotion: 'reduce' })
    const p2 = await c2.newPage()
    p2.on('pageerror', e => console.log('pageerror:', e.message))
    await p2.goto(`http://127.0.0.1:5199/harness.html?locale=${locale}&session=${kind}&theme=dark`, { waitUntil: 'load' })
    await p2.waitForSelector('.session-window .xterm-rows')
    await p2.waitForTimeout(800)
    await p2.evaluate(() => document.activeElement && document.activeElement.blur())
    await shot(p2, `fabric-console-${kind}`, locale)
    await c2.close()
  }
}
await browser.close()
