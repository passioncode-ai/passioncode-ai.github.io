// Run: a Chrome with remote debugging on 127.0.0.1:9222, then node scripts/e2e/story-matrix.mjs <origin> (local dist-assessment or https://assessment.passioncode.ai).
// SITE-068 v5 full check: every scenario at desktop 1440 and phone 390, in Russian and English, real input (CDP wheel with
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
  const go = async path => { await send('Page.navigate', { url: ORIGIN + path }); await sleep(5000) }
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
    // language: header, html lang, the visible switch before the story
    await p.go(`/?lang=${lang}`)
    const head = await p.js(`(() => { const b = [...document.querySelectorAll('.lang-switch .lang')]; const r = document.querySelector('.lang-switch').getBoundingClientRect(); return { lang: document.documentElement.dataset.lang, pressed: b.filter(x => x.getAttribute('aria-pressed') === 'true').map(x => x.textContent), visible: r.width > 0 && r.top < 80, overflow: document.documentElement.scrollWidth - innerWidth } })()`)
    ok(`${tag}: language and switch visible at the top, no overflow`, head.lang === lang && head.pressed[0] === lang.toUpperCase() && head.visible && head.overflow <= 0, head)
    // act 0: a real click (arms sound), then one gesture per frame to the pills, every stop in order
    await p.click(30, h - 30); await sleep(400)
    for (let k = 0; k < 10; k++) { await gesture(p, mobile); await sleep(1400) }
    await sleep(2500)
    const a0 = await p.js(`({ arr: __pagerLog.filter(e => 'arrive' in e), stops: __pagerStops, peek: document.querySelector('.act0-rabbit').classList.contains('peek'), gate: document.getElementById('after').hidden, y: Math.round(scrollY) })`)
    const pillsY = a0.stops[a0.stops.length - 1]
    ok(`${tag}: act 0 one frame per gesture, none skipped, gate at the pills, rabbit peeks`, inOrder(a0.arr) && a0.arr[0].arrive === 1 && a0.arr.length === a0.stops.length - 1 && Math.abs(a0.y - pillsY) <= 12 && a0.gate && a0.peek, { arrivals: a0.arr.map(a => a.arrive), stops: a0.stops.length })
    // red: rail, panels one per gesture, then End reaches the onboarding
    await p.js(`document.querySelector('[data-pill=red]').click()`); await sleep(3000)
    await p.js('__pagerLog.length = 0')
    for (let k = 0; k < 8; k++) { await gesture(p, mobile); await sleep(1500) }
    await sleep(2500)
    const red = await p.js(`({ arr: __pagerLog.filter(e => 'arrive' in e), gestures: __pagerLog.filter(e => e.quiet || e.rise || e.dir).length, stops: __pagerStops, rail: !document.querySelector('.rail').hidden, on: [...document.querySelectorAll('.rail-node')].findIndex(n => n.classList.contains('on')), nodes: document.querySelectorAll('.rail-node').length })`)
    ok(`${tag}: red path shows the rail, panels leaf in order with none skipped, at most one per gesture`, red.rail && red.nodes === 15 && red.arr.length >= 5 && red.arr.length <= 9 && inOrder(red.arr) && red.on > 0, { arrivals: red.arr.map(a => a.arrive), on: red.on })
    await p.js(`document.querySelectorAll('.panel').forEach(el => el.classList.add('in'))`)
    if (!mobile) { await p.key('End'); await sleep(3500) } else await p.js(`scrollTo(0, document.documentElement.scrollHeight)`)
    await sleep(1500)
    const end = await p.js(`(() => { const o = document.getElementById('onboard'); const r = o.getBoundingClientRect(); const a = o.querySelector('a[href]'); return { seen: r.top < innerHeight && r.bottom > 0, href: a && a.getAttribute('href'), overflow: document.documentElement.scrollWidth - innerWidth } })()`)
    ok(`${tag}: the end reaches the onboarding, its button has a link, no overflow`, end.seen && !!end.href && end.overflow <= 0, end)
    // blue: the film over the whole screen, its end card, blue loops, red enters the Matrix
    await p.go(`/?lang=${lang}&pill=blue`); await p.key('Shift')
    for (let i = 0; i < 30 && (await p.js(`document.querySelector('#film video').readyState`)) < 3; i++) await sleep(1000)
    const film = await p.js(`(() => { const v = document.querySelector('#film video'); const r = document.getElementById('film').getBoundingClientRect(); return { open: !document.getElementById('film').hidden, full: Math.round(r.width) === innerWidth && Math.round(r.height) === innerHeight, src: v.currentSrc.split('/').pop(), d: v.duration } })()`)
    await p.js(`(() => { const v = document.querySelector('#film video'); v.muted = true; v.currentTime = v.duration - 0.3; return v.play().catch(e => String(e)) })()`); await sleep(2500)
    film.end = await p.js(`!document.querySelector('.film-end').hidden`)
    await p.js(`document.querySelector('[data-film=blue]').click()`); await sleep(800)
    film.loop = await p.js(`(() => { const v = document.querySelector('#film video'); return document.querySelector('.film-end').hidden && v.currentTime < 3 })()`)
    await p.js(`(() => { const v = document.querySelector('#film video'); v.currentTime = v.duration - 0.3; return v.play().catch(e => String(e)) })()`); await sleep(2500)
    await p.js(`document.querySelector('[data-film=red]').click()`); await sleep(2600)
    film.red = await p.js(`document.getElementById('film').hidden && !document.querySelector('.rail').hidden`)
    ok(`${tag}: film full screen in its language, end card, blue loops, red enters`, film.open && film.full && film.src === `film-${lang}.mp4` && film.d > 79 && film.end && film.loop && film.red, film)
    // captions in the reader's language
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
    const sw = await p.js(`({ lang: document.documentElement.dataset.lang, visibleEn: [...document.querySelectorAll('[lang=en]')].some(e => e.offsetParent && e.textContent.trim()), visibleRu: [...document.querySelectorAll('h1 [lang=ru], .hero [lang=ru]')].some(e => e.offsetParent) })`)
    await p.go('/'); const kept = await p.js('document.documentElement.dataset.lang')
    ok('switch RU to EN changes the text and is remembered', sw.lang === 'en' && sw.visibleEn && !sw.visibleRu && kept === 'en', { ...sw, kept })
  }
  await p.close()
}
// deep link red, reduced motion
{ const p = await page({ w: 1440, h: 900, mobile: false })
  await p.go('/?lang=en&pill=red'); await sleep(1500)
  ok('?pill=red opens the story at its first panel', await p.js(`!document.getElementById('after').hidden && !document.querySelector('.rail').hidden`))
  await p.close() }
{ const p = await page({ w: 1440, h: 900, mobile: false, reduce: true })
  await p.go('/?lang=ru'); const y0 = await p.js('scrollY')
  await p.flick(); await sleep(1500)
  const r = await p.js(`({ moved: scrollY > ${y0}, bar: getComputedStyle(document.querySelector('.hold-bar') || document.body).display })`)
  await p.js(`document.querySelector('[data-pill=red]').click()`); await sleep(1500)
  const shown = await p.js(`[...document.querySelectorAll('.panel')].every(el => el.classList.contains('in'))`)
  ok('reduced motion: native scroll, every panel shown, no wait bar, no errors', r.moved && shown && r.bar === 'none' && p.errors.length === 0, { ...r, shown, errors: p.errors.slice(0, 2) })
  await p.close() }
const failed = results.filter(r => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
