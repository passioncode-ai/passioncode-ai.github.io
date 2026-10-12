// WebKit (Safari's engine) check of the home video's captions (SITE-035) against a LOCAL Worker
// (wrangler dev --local --local-protocol https), never production. Usage:
//   PLAYWRIGHT_CORE=<path to playwright-core 1.63> node webkit-captions.cjs https://127.0.0.1:8913 <out.json>
// Per language (pl, ja) at 390 px: the page's <track> names its own captions file, srclang and a
// label in the page's language; the browser loads that track (readyState 2) with the same 14 cues
// and timings as home.vtt; the first cue's text is the file's; no horizontal overflow, no page error.
const { webkit } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core')
const fs = require('fs')
const [base, out] = process.argv.slice(2)
const EXPECT = {
  pl: { src: '/assets/video/home-pl.vtt', srclang: 'pl', label: 'Napisy' },
  ja: { src: '/assets/video/home-ja.vtt', srclang: 'ja', label: '字幕' }
}
;(async () => {
  const browser = await webkit.launch()
  const rows = []
  const plain = await browser.newContext({ ignoreHTTPSErrors: true })
  const get = async path => (await plain.request.get(base + path)).text()
  const english = await get('/assets/video/home.vtt')
  const enTimings = english.split('\n').filter(l => l.includes(' --> '))
  for (const [locale, want] of Object.entries(EXPECT)) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale, reducedMotion: 'reduce', ignoreHTTPSErrors: true })
    const page = await ctx.newPage()
    const errors = []
    const vttRequests = []
    page.on('pageerror', e => errors.push(String(e)))
    page.on('response', r => { if (r.url().endsWith('.vtt')) vttRequests.push({ url: new URL(r.url()).pathname, status: r.status() }) })
    const res = await page.goto(`${base}/${locale}/`, { waitUntil: 'load' })
    await page.locator('#how video').scrollIntoViewIfNeeded()
    // Ask the browser for the default track's cues; WebKit loads a showing track on its own.
    const track = await page.evaluate(async () => {
      const el = document.querySelector('#how video track')
      const t = el.track
      if (t.mode !== 'showing') t.mode = 'showing'
      for (let i = 0; i < 100 && el.readyState !== 2; i++) await new Promise(r => setTimeout(r, 100))
      const fmt = s => { const ms = Math.round(s * 1000); const z = (n, w) => String(n).padStart(w, '0'); return `00:${z(Math.floor(ms / 60000), 2)}:${z(Math.floor(ms / 1000) % 60, 2)}.${z(ms % 1000, 3)}` }
      return {
        src: el.getAttribute('src'), srclang: el.getAttribute('srclang'), label: el.getAttribute('label'), default: el.default,
        readyState: el.readyState, mode: t.mode, language: t.language,
        cues: t.cues ? [...t.cues].map(c => ({ timing: `${fmt(c.startTime)} --> ${fmt(c.endTime)}`, text: c.text })) : null,
        overflow: document.documentElement.scrollWidth > innerWidth
      }
    })
    const file = await get(want.src)
    const fileTimings = file.split('\n').filter(l => l.includes(' --> '))
    const firstText = file.split('\n\n')[1].split('\n').slice(2).join('\n')
    const checks = {
      http200: res.status() === 200,
      trackSrc: track.src === want.src,
      srclang: track.srclang === want.srclang,
      label: track.label === want.label,
      defaultOn: track.default === true,
      loaded: track.readyState === 2,
      fetchedOwnFile: vttRequests.some(r => r.url === want.src && r.status === 200),
      noEnglishFetched: !vttRequests.some(r => r.url === '/assets/video/home.vtt'),
      cueCount14: track.cues?.length === 14,
      timingsAsEnglish: JSON.stringify(track.cues?.map(c => c.timing)) === JSON.stringify(enTimings) && JSON.stringify(fileTimings) === JSON.stringify(enTimings),
      firstCueText: track.cues?.[0]?.text === firstText,
      noOverflow: !track.overflow,
      noPageErrors: errors.length === 0
    }
    rows.push({ locale, width: 390, path: `/${locale}/`, track: { ...track, cues: track.cues?.length }, firstCue: track.cues?.[0], vttRequests, errors, checks, pass: Object.values(checks).every(Boolean) })
    await ctx.close()
  }
  await browser.close()
  const result = { engine: 'webkit', playwrightCore: require((process.env.PLAYWRIGHT_CORE || 'playwright-core') + '/package.json').version, base, rows, pass: rows.every(r => r.pass) }
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n')
  console.log(rows.map(r => `${r.locale} ${r.width}: ${r.pass ? 'PASS' : 'FAIL ' + JSON.stringify(r.checks)}`).join('\n'))
  process.exit(result.pass ? 0 : 1)
})().catch(e => { console.error(e); process.exit(2) })
