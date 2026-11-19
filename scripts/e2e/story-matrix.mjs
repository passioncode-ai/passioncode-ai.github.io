// Run: a Chrome with remote debugging on 127.0.0.1:9222, then node scripts/e2e/story-matrix.mjs <origin> (local dist-assessment or https://assessment.passioncode.ai).
// SITE-068 v6 full check (v5 before it): every scenario at desktop 1440 and phone 390, in Russian and English, real input (CDP wheel with
// the system's timestamps, touch, keys). Prints one line per check and a summary; exit 1 on any failure.
// Usage: node matrix.mjs <origin>
const ORIGIN = process.argv[2] || 'http://127.0.0.1:8903'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const results = []
const ok = (name, pass, detail) => { results.push({ name, pass }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + JSON.stringify(detail) : ''}`) }

async function page ({ w, h, mobile, locale, reduce }) {
  const tab = await (await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' })).json()
  const ws = new WebSocket(tab.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r)
  let id = 0; const wait = new Map(); const errors = []
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id) }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 160) || m.params.exceptionDetails.text)
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error' && !/favicon/.test(m.params.entry.url || '')) errors.push(m.params.entry.text.slice(0, 160)) }
  const send = (method, params = {}) => new Promise(r => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const js = async ex => { const r = (await send('Runtime.evaluate', { expression: ex, returnByValue: true, awaitPromise: true })).result; if (r?.exceptionDetails) throw new Error('page: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 200) + ' in ' + ex.slice(0, 80)); return r?.result?.value }
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile })
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
  if (locale) { await send('Emulation.setLocaleOverride', { locale }); await send('Emulation.setUserAgentOverride', { userAgent: (await js('navigator.userAgent')) || 'Mozilla/5.0', acceptLanguage: locale }) }
  if (reduce) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__pagerLog = []; try { if (!sessionStorage.__init) { localStorage.removeItem('story-lang'); sessionStorage.__init = 1 } } catch {}
    window.__rest = []; (() => { let y = -1, since = performance.now(); setInterval(() => { const n = Math.round(scrollY); if (n !== y) { y = n; since = performance.now() } else if (performance.now() - since > 300 && __rest[__rest.length - 1] !== n) __rest.push(n) }, 50) })()` })
  // ready: the language script has pressed its button and the comic's script has measured its stops (or, under reduced
  // motion, revealed the panels); a loaded machine can take far longer than a fixed wait
  const go = async path => { await send('Page.navigate', { url: ORIGIN + path }); await sleep(800)
    const READY = `(() => { try { const d = document.documentElement, l = d && d.dataset.lang; if (!l || document.readyState !== 'complete') return false
      const b = document.querySelector('.lang-switch .lang[aria-pressed=true]'), m = document.getElementById('lang-menu')
      return ((b && b.dataset.setLang === l) || (m && m.value === l)) && (Array.isArray(window.__pagerStops) || matchMedia('(prefers-reduced-motion: reduce)').matches) } catch { return false } })()`
    for (let i = 0; i < 60; i++) { if (await js(READY).catch(() => false)) break; await sleep(500) }
    await sleep(1200) }
  const click = async (x, y) => { for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }) }
  const flick = async () => { const ev = [4,10,22,38,52,60,58,50,42,35,29,24,20,16,13,11,9,7,6,5,4,3,3,2,2,1,1,1,1], base = Date.now() / 1000
    await Promise.all(ev.map((d, i) => send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: w / 2, y: h / 2, deltaX: 0, deltaY: d, timestamp: base + i * 0.016 }))) }
  const swipe = async () => { await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: w / 2, y: h * 0.7 }] })
    for (let y = h * 0.68; y >= h * 0.4; y -= 30) { await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: w / 2, y }] }); await sleep(16) }
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }) }
  const key = async k => { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: k, code: k === 'Shift' ? 'ShiftLeft' : k, windowsVirtualKeyCode: { ArrowDown: 40, End: 35, Home: 36, Shift: 16 }[k] }) }
  const close = async () => { ws.close(); await fetch(`http://127.0.0.1:9222/json/close/${tab.id}`) }
  return { send, js, go, click, flick, swipe, key, close, errors }
}

const gesture = (p, mobile) => (mobile ? p.swipe() : p.flick())
// the frames the reader rested on must be the pager's stops, in order, none skipped
const inOrder = arrivals => arrivals.length > 0 && arrivals.every((a, i) => i === 0 || a.arrive === arrivals[i - 1].arrive + 1)

for (const [dev, w, h, mobile] of [['desktop', 1440, 900, false], ['phone', 390, 844, true]]) {
  for (const lang of ['ru', 'en']) {
    const tag = `${dev} ${lang}`
    const p = await page({ w, h, mobile })
    // v6 intro: no header, only the language switch; the rabbit hops in, Morpheus offers the pills, the page ends there
    await p.go(`/?lang=${lang}`); await sleep(2600)
    const head = await p.js(`(() => { const b = [...document.querySelectorAll('.lang-switch .lang')]; const r = document.querySelector('.lang-switch').getBoundingClientRect(); const brand = document.querySelector('.bar .brand'); return { lang: document.documentElement.dataset.lang, pressed: b.filter(x => x.getAttribute('aria-pressed') === 'true').map(x => x.textContent), visible: r.width > 0 && r.top < 80, brandHidden: getComputedStyle(brand).visibility === 'hidden', offered: document.getElementById('act0').classList.contains('offered'), pills: document.querySelectorAll('#act0 [data-pill]').length, overflow: document.documentElement.scrollWidth - innerWidth } })()`)
    ok(`${tag}: no header, the language switch at the top, the rabbit and the pills offered, no overflow`, head.lang === lang && head.pressed[0] === lang.toUpperCase() && head.visible && head.brandHidden && head.offered && head.pills === 2 && head.overflow <= 0, head)
    await p.click(30, h - 30); await sleep(400)
    for (let k = 0; k < 3; k++) { await gesture(p, mobile); await sleep(900) }
    const gate = await p.js(`({ after: document.getElementById('after').hidden, y: Math.round(scrollY) })`)
    ok(`${tag}: the page stops at the pills until one is chosen`, gate.after && gate.y <= 12, gate)
    // red: the backstory over the whole screen in the reader's language; at its end the big chat opens
    await p.js(`document.querySelector('#act0 [data-pill=red]').click()`)
    for (let i = 0; i < 30 && (await p.js(`document.querySelector('#backstory video').readyState`)) < 1; i++) await sleep(1000)
    const bs = await p.js(`(() => { const v = document.querySelector('#backstory video'); const r = document.getElementById('backstory').getBoundingClientRect(); const rot = getComputedStyle(document.querySelector('#backstory .film-rot')).transform; return { open: !document.getElementById('backstory').hidden, full: Math.round(r.width) === innerWidth && Math.round(r.height) === innerHeight, src: v.currentSrc.split('/').pop(), d: Math.round(v.duration), rotated: rot !== 'none' } })()`)
    await p.js(`(() => { const v = document.querySelector('#backstory video'); v.muted = true; v.currentTime = v.duration - 0.3; return v.play().catch(e => String(e)) })()`); await sleep(3000)
    bs.chat = await p.js(`document.getElementById('backstory').hidden && !document.getElementById('after').hidden && !document.querySelector('.rail').hidden`)
    ok(`${tag}: red plays the backstory full screen in its language${mobile ? ', turned to landscape' : ''}, then the chat opens`, bs.open && bs.full && bs.src === `backstory-${lang}.mp4` && bs.d > 40 && bs.chat && bs.rotated === mobile, bs)
    // the big chat: one message per gesture, in order, the lines speak and the page waits for them
    await p.js('__pagerLog.length = 0')
    for (let k = 0; k < 6; k++) { await gesture(p, mobile); await sleep(1500) }
    await sleep(2000)
    const ch = await p.js(`({ arr: __pagerLog.filter(e => 'arrive' in e), on: document.querySelectorAll('.bc-msgs .m.on').length, all: document.querySelectorAll('.bc-msgs .m').length, big: parseFloat(getComputedStyle(document.querySelector('.bc-msgs .m.on p')).fontSize) })`)
    ok(`${tag}: the chat leafs message by message in order, none skipped, large type`, inOrder(ch.arr) && ch.on >= 4 && ch.on <= ch.all && ch.big >= (mobile ? 18 : 22), { arrivals: ch.arr.map(a => a.arrive), on: ch.on, big: ch.big })
    // on into the comic: panels in order, at most one per gesture
    await p.js(`window.__pager.go(window.__pager.list().findIndex(s => s.el && s.el.id === 'p1'))`); await sleep(2500)
    await p.js('__pagerLog.length = 0')
    for (let k = 0; k < 5; k++) { await gesture(p, mobile); await sleep(1500) }
    await sleep(2500)
    const red = await p.js(`({ arr: __pagerLog.filter(e => 'arrive' in e), on: [...document.querySelectorAll('.rail-node')].findIndex(n => n.classList.contains('on')), nodes: document.querySelectorAll('.rail-node').length, panelW: Math.round(document.getElementById('p1').getBoundingClientRect().width) })`)
    ok(`${tag}: panels leaf in order, at most one per gesture, the rail follows, panels fill the screen`, red.nodes === 12 && red.arr.length >= 2 && red.arr.length <= 6 && inOrder(red.arr) && red.on > 0 && red.panelW >= (mobile ? 340 : 1000), { arrivals: red.arr.map(a => a.arrive), on: red.on, panelW: red.panelW })
    if (!mobile) { await p.key('End'); await sleep(3500) } else await p.js(`scrollTo(0, document.documentElement.scrollHeight)`)
    await sleep(1500)
    const end = await p.js(`(() => { const o = document.getElementById('final'); const r = o.getBoundingClientRect(); const tg = o.querySelector('[data-tg]'); const line = o.querySelector('.final-line'); return { seen: r.top < innerHeight && r.bottom > 0, tg: tg && tg.href, x: !!o.querySelector('a[href="https://x.com/sshlg93"]'), li: !!o.querySelector('a[href*="linkedin.com/in/sergey-sheleg"]'), line: line && getComputedStyle(line).opacity === '1', overflow: document.documentElement.scrollWidth - innerWidth } })()`)
    ok(`${tag}: the end opens Morpheus's chat in the reader's language, X and LinkedIn, no overflow`, end.seen && end.tg === `https://t.me/MorpheusPMBot?start=lp_assessment_${lang}` && end.x && end.li && end.line && end.overflow <= 0, end)
    // blue: «Пробуждение» over the whole screen, its end card, blue loops, red goes on to the backstory
    await p.go(`/?lang=${lang}&pill=blue`); await p.key('Shift')
    for (let i = 0; i < 30 && (await p.js(`document.querySelector('#film video').readyState`)) < 3; i++) await sleep(1000)
    const film = await p.js(`(() => { const v = document.querySelector('#film video'); const r = document.getElementById('film').getBoundingClientRect(); return { open: !document.getElementById('film').hidden, full: Math.round(r.width) === innerWidth && Math.round(r.height) === innerHeight, src: v.currentSrc.split('/').pop(), d: v.duration } })()`)
    await p.js(`(() => { const v = document.querySelector('#film video'); v.muted = true; v.currentTime = v.duration - 0.3; return v.play().catch(e => String(e)) })()`); await sleep(2500)
    film.end = await p.js(`!document.querySelector('#film .film-end').hidden`)
    await p.js(`document.querySelector('[data-film=blue]').click()`); await sleep(800)
    film.loop = await p.js(`(() => { const v = document.querySelector('#film video'); return document.querySelector('#film .film-end').hidden && v.currentTime < 3 })()`)
    await p.js(`(() => { const v = document.querySelector('#film video'); v.currentTime = v.duration - 0.3; return v.play().catch(e => String(e)) })()`); await sleep(2500)
    await p.js(`document.querySelector('[data-film=red]').click()`); await sleep(1500)
    film.red = await p.js(`document.getElementById('film').hidden && !document.getElementById('backstory').hidden`)
    ok(`${tag}: film full screen in its language, end card, blue loops, red goes to the backstory`, film.open && film.full && film.src === `film-${lang}.mp4` && film.d > 79 && film.end && film.loop && film.red, film)
    ok(`${tag}: no errors on the page`, p.errors.length === 0, p.errors.slice(0, 3))
    await p.close()
  }
}
// language from the browser, and the switch
for (const [locale, want] of [['ru-RU', 'ru'], ['en-US', 'en'], ['de-DE', 'de'], ['uk-UA', 'en']]) {
  const p = await page({ w: 1440, h: 900, mobile: false, locale })
  await p.go('/')
  const got = await p.js('document.documentElement.dataset.lang')
  ok(`browser ${locale}: page opens in ${want}`, got === want, { got })
  if (locale === 'ru-RU') {
    await p.js(`document.querySelector('.lang-switch .lang[data-set-lang=en]').click()`); await sleep(600)
    const sw = await p.js(`({ lang: document.documentElement.dataset.lang, visibleEn: [...document.querySelectorAll('[lang=en]')].some(e => e.offsetParent && e.textContent.trim()), visibleRu: [...document.querySelectorAll('.intro-line [lang=ru], #act0 .pill [lang=ru]')].some(e => e.offsetParent) })`)
    await p.go('/'); const kept = await p.js('document.documentElement.dataset.lang')
    ok('switch RU to EN changes the text and is remembered', sw.lang === 'en' && sw.visibleEn && !sw.visibleRu && kept === 'en', { ...sw, kept })
  }
  await p.close()
}
// deep link red, reduced motion
{ const p = await page({ w: 1440, h: 900, mobile: false })
  await p.go('/?lang=en&pill=red'); await sleep(1500)
  ok('?pill=red opens the story at the chat', await p.js(`!document.getElementById('after').hidden && !document.querySelector('.rail').hidden && Math.abs(document.getElementById('chat').getBoundingClientRect().top) < innerHeight`))
  await p.close() }
{ const p = await page({ w: 1440, h: 900, mobile: false, reduce: true })
  await p.go('/?lang=ru'); const y0 = await p.js('scrollY')
  await p.flick(); await sleep(1500)
  const r = await p.js(`({ moved: scrollY > ${y0}, bar: getComputedStyle(document.querySelector('.hold-bar') || document.body).display })`)
  await p.js(`document.querySelector('#backstory [data-film=skip]') && (document.querySelector('[data-pill=red]').click(), document.querySelector('#backstory [data-film=skip]').click())`); await sleep(1500)
  const shown = await p.js(`[...document.querySelectorAll('.bc-msgs .m')].every(m => getComputedStyle(m).display !== 'none') && !document.getElementById('after').hidden`)
  ok('reduced motion: native scroll, every panel shown, no wait bar, no errors', r.moved && shown && r.bar === 'none' && p.errors.length === 0, { ...r, shown, errors: p.errors.slice(0, 2) })
  await p.close() }
const failed = results.filter(r => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
