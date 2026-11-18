// The code rain (SITE-068, Matrix look). A canvas of falling glyph columns behind the page; it speeds up with
// scroll velocity and dims while a panel holds focus. Reduced motion: nothing is drawn. aria-hidden.
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFΣλ<>/{}=+*'

export function mountRain(canvas, getState) {
  const ctx = canvas.getContext('2d')
  let cols = [], size = 16, dpr = 1, last = performance.now()
  const build = () => {
    dpr = Math.min(1.5, devicePixelRatio || 1)
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
    size = innerWidth < 700 ? 13 : 16
    const n = Math.ceil(innerWidth / size)
    cols = Array.from({ length: n }, () => ({ y: Math.random() * -innerHeight, v: 40 + Math.random() * 90, len: 8 + (Math.random() * 22 | 0), seed: Math.random() * 1000 | 0 }))
  }
  build(); addEventListener('resize', build)
  return () => {
    const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now
    const s = getState()
    const boost = 1 + Math.min(6, Math.abs(s.vel) * 18)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.font = `${size}px ui-monospace, Menlo, monospace`
    ctx.textBaseline = 'top'
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i]
      c.y += c.v * dt * boost
      if (c.y - c.len * size > innerHeight) { c.y = Math.random() * -200; c.v = 40 + Math.random() * 90 }
      for (let k = 0; k < c.len; k++) {
        const y = c.y - k * size
        if (y < -size || y > innerHeight) continue
        const g = GLYPHS[(c.seed + k * 7 + ((now / 140) | 0) * (k === 0 ? 1 : 0)) % GLYPHS.length]
        const a = k === 0 ? 0.9 : (1 - k / c.len) * 0.45
        ctx.fillStyle = k === 0 ? `rgba(214,255,226,${a})` : `rgba(0,255,102,${a})`
        ctx.fillText(g, i * size, y)
      }
    }
  }
}
