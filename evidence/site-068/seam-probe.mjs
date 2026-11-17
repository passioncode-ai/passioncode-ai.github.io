import { webkit } from 'playwright'
const [base, path = '/'] = process.argv.slice(2)
const b = await webkit.launch()
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } })
  await p.goto(base + path + '?lang=ru', { waitUntil: 'networkidle' })
  const geo = await p.evaluate(() => { const s = document.getElementById('story'); return { top: s.offsetTop, h: s.offsetHeight } })
  const out = []
  for (const g of [0.3, 1.0, 1.5, 4.95, 5.5, 7.98, 8.3, 8.5, 9.0, 9.5, 10.5]) {
    const y = geo.top + g / 11 * (geo.h - h)
    await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(350)
    const r = await p.evaluate(() => {
      const c = document.getElementById('pixels'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
      let n = 0; for (let i = 3; i < d.length; i += 64) if (d[i]) n++
      const stage = document.getElementById('stage').getBoundingClientRect()
      const on = document.querySelector('.scene.on')?.dataset.s
      return { cover: +(n / (d.length / 64)).toFixed(2), on, stageTop: Math.round(stage.top), ch: document.getElementById('ch-num').textContent }
    })
    out.push(`${g}:${JSON.stringify(r)}`)
  }
  console.log(w, out.join(' | '))
  await p.close()
}
await b.close()
