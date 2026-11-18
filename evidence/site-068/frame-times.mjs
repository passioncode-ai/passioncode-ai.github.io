import { webkit } from 'playwright'
const base = process.argv[2]
const b = await webkit.launch()
for (const [look, path] of [['V1', '/'], ['V2', '/v2/']]) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } })
  await p.goto(base + path + '?lang=ru', { waitUntil: 'networkidle' })
  const r = await p.evaluate(async () => {
    const s = document.getElementById('story'); const top = s.offsetTop, H = s.offsetHeight - innerHeight
    const times = []; let last = performance.now()
    for (let i = 0; i <= 240; i++) {
      scrollTo(0, top + H * i / 240)
      await new Promise(r => requestAnimationFrame(r)); const t = performance.now(); times.push(t - last); last = t
    }
    times.sort((a, b) => a - b)
    return { median: times[120].toFixed(1), p95: times[228].toFixed(1), max: times[240].toFixed(0) }
  })
  console.log(look, w, JSON.stringify(r)); await p.close()
}
await b.close()
