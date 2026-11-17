// SITE-068 refactor 2026-11-17: checks F1 to F16 of docs/tasks/2026-11-17-story-landing-refactor.md in WebKit on both
// looks. Run: npm run build:assessment, serve dist-assessment, then `node story-functions.mjs http://127.0.0.1:<port>`
// from a folder with playwright installed (not a dependency of this site).
import { webkit } from 'playwright'
const base = process.argv[2]
const b = await webkit.launch()
const results = []
const ok = (look, id, cond, note = '') => results.push(`${cond ? 'PASS' : 'FAIL'} ${look} ${id} ${note}`)
for (const [look, path] of [['V1', '/'], ['V2', '/v2/']]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage(); const errs = []
  p.on('pageerror', e => errs.push(String(e)))
  const resp = await p.goto(base + path + '?lang=en', { waitUntil: 'networkidle' })
  const geo = await p.evaluate(() => { const s = document.getElementById('story'); return { top: s.offsetTop, h: s.offsetHeight } })
  const at = async g => { await p.evaluate(y => scrollTo(0, y), geo.top + g / 11 * (geo.h - 900)); await p.waitForTimeout(700) }
  // F1 language
  await p.click('[data-set-lang="ru"]')
  const ru = await p.evaluate(() => [document.documentElement.lang, localStorage.getItem('story-lang'), getComputedStyle(document.querySelector('h1 [lang=ru]')).display !== 'none'])
  ok(look, 'F1', ru[0] === 'ru' && ru[1] === 'ru' && ru[2], JSON.stringify(ru))
  await p.goto(base + path, { waitUntil: 'networkidle' })
  ok(look, 'F1-persist', await p.evaluate(() => document.documentElement.lang) === 'ru')
  // F2 hero preview loops
  await p.waitForTimeout(3200); ok(look, 'F2', await p.evaluate(() => document.querySelectorAll('#mini li.on').length) >= 1)
  // F3 entry before story top
  await p.evaluate(y => scrollTo(0, y - 300), geo.top)
  await p.waitForTimeout(300)
  ok(look, 'F3', await p.evaluate(() => !!document.querySelector('.scene.on[data-s="0"]') && !!document.querySelector('.cap.on[data-c="0"]')))
  // F4 chapter change and back
  await at(3.5); const c3 = await p.evaluate(() => [document.querySelector('.scene.on')?.dataset.s, document.querySelector('.cap.on')?.dataset.c, document.getElementById('ch-num').textContent])
  await at(1.5); const c1 = await p.evaluate(() => document.querySelector('.scene.on')?.dataset.s)
  ok(look, 'F4', c3.join() === '3,3,03' && c1 === '1', JSON.stringify([c3, c1]))
  // F5 seam within panel, capped
  await at(3.0); const seam = await p.evaluate(() => { const c = document.getElementById('pixels'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; const cap = document.querySelector('.caption').getBoundingClientRect(); const top = Math.round(cap.bottom); const row = c.getContext('2d').getImageData(0, 0, c.width, Math.max(1, top - 10)).data; let m = 0; for (let i = 3; i < row.length; i += 4) if (row[i]) m++; return [n / (d.length / 4), m] })
  ok(look, 'F5', seam[0] > 0 && seam[0] <= 0.4 && seam[1] === 0, JSON.stringify(seam))
  // F6 chat on clock
  await at(2.3); const m1 = await p.evaluate(() => document.querySelectorAll('.msg.on').length)
  await at(6.9); const m2 = await p.evaluate(() => document.querySelectorAll('.msg.on').length)
  ok(look, 'F6', m2 > m1 && m1 > 0, `${m1}->${m2}`)
  // F7 org: token moves, timer, stamps
  await at(7.6); const org = await p.evaluate(() => [document.getElementById('timer').textContent, document.querySelectorAll('.stamp.on').length, document.querySelectorAll('.ag.live').length])
  ok(look, 'F7', org[0] !== '00:00' && org[1] >= 2 && org[2] === 7, JSON.stringify(org))
  // F8 HUD
  await at(9.9); const hud = await p.evaluate(() => [document.getElementById('h-reply').textContent, document.getElementById('h-cost').textContent])
  ok(look, 'F8', hud[0] === '30 s' && hud[1] === '$3.0', JSON.stringify(hud))
  // F9 rail
  await p.click('#rail a[data-i="4"]'); await p.waitForTimeout(1600)
  ok(look, 'F9', await p.evaluate(() => document.getElementById('ch-num').textContent) === '04')
  // F10 voice
  await p.click('#voice'); await p.waitForTimeout(600)
  const v = await p.evaluate(() => [document.getElementById('voice').getAttribute('aria-pressed'), document.getElementById('vo-sub').textContent.length > 5])
  await p.click('#voice')
  ok(look, 'F10', v[0] === 'true' && v[1], JSON.stringify(v))
  // F11 final and apply
  await at(10.6); const fin = await p.evaluate(() => [document.getElementById('final').classList.contains('on'), document.querySelector('#apply .cta').href])
  ok(look, 'F11', fin[0] && fin[1] === 'https://passioncode.ai/business/#lead-form', JSON.stringify(fin))
  // F12 links between variants
  const links = await p.evaluate(() => [...document.querySelectorAll('.bar .alt-link')].filter(a => getComputedStyle(a).display !== 'none').map(a => a.getAttribute('href')))
  ok(look, 'F12/F15-link', links.includes('/film/') && links.includes(look === 'V1' ? '/v2/' : '/'), JSON.stringify(links))
  // F14 robots
  ok(look, 'F14', (await p.evaluate(() => document.querySelector('meta[name=robots]').content)).includes('noindex'))
  // F15 look class
  ok(look, 'F15', await p.evaluate(() => document.documentElement.classList.contains('ink')) === (look === 'V2'))
  // F16 original guide
  ok(look, 'F16', await p.evaluate(() => !!document.querySelector('svg.guide .g-wave') && !document.querySelector('.shades')))
  ok(look, 'errors', errs.length === 0, JSON.stringify(errs))
  await ctx.close()
  // F13 reduced motion
  const rctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  const rp = await rctx.newPage(); await rp.goto(base + path, { waitUntil: 'networkidle' })
  const calm = await rp.evaluate(() => [document.documentElement.classList.contains('calm'), document.querySelectorAll('.scene.on').length, getComputedStyle(document.getElementById('rain')).display, document.querySelectorAll('.scene').length])
  ok(look, 'F13', calm[0] && calm[1] === calm[3] && calm[2] === 'none', JSON.stringify(calm))
  await rctx.close()
}
const fp = await (await b.newContext()).newPage(); const fe = []; fp.on('pageerror', e => fe.push(String(e)))
const fr = await fp.goto(base + '/film/', { waitUntil: 'networkidle' })
ok('film', 'F12', fr.status() === 200 && fe.length === 0, JSON.stringify(fe))
await b.close()
console.log(results.join('\n'))
