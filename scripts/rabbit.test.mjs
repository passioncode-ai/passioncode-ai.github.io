// SITE-075: the white rabbit's crossing (assets/rabbit.js): it starts at the far edge of the window, hops calmly, pauses
// once, ends exactly on its seat and turns to face the label when it came from the other side.
import assert from 'node:assert/strict'
import test from 'node:test'
import { keyframes, plan } from '../assets/rabbit.js'

const last = frames => frames[frames.length - 1]

test('desktop, left to right text: the button is on the left, so the rabbit comes from the right and needs no turn', () => {
  const p = plan({ seatLeft: 380, seatWidth: 46, viewport: 1440, rtl: false })
  assert.ok(p.start > 900, `starts near the right edge (${p.start})`)
  assert.equal(p.flip, 1)
  assert.ok(p.hops >= 3 && p.hops <= 7)
  const { duration, frames } = keyframes(p)
  assert.equal(frames[0].opacity, 0)
  assert.equal(last(frames).transform, 'translate(0.0px, 0.0px) scale(1.000, 1.000)')
  assert.equal(last(frames).offset, 1)
  assert.ok(duration > 3000 && duration < 7000, `a calm crossing, ${duration} ms`)
  for (const f of frames) assert.ok(Number(/translate\([^,]+, (-?[\d.]+)px/.exec(f.transform)[1]) >= -34, 'low hops')
})

test('phone, left to right text: the seat is near the right edge, so the rabbit comes from the left and turns at the end', () => {
  const p = plan({ seatLeft: 310, seatWidth: 40, viewport: 390, rtl: false, scale: 40 / 46 })
  assert.ok(p.start < 0, 'starts at the left edge')
  assert.equal(p.flip, -1)
  const { frames } = keyframes(p)
  assert.equal(last(frames).transform, 'translate(0px, 0px) scale(1, 1)')
  assert.match(frames[frames.length - 2].transform, /scale\(-1, 1\)/)
})

test('right to left text (ar): mirrored, it comes from the far side and faces the label', () => {
  const p = plan({ seatLeft: 1020, seatWidth: 46, viewport: 1440, rtl: true })
  assert.ok(p.start < 0, 'the seat is on the right, so it starts at the left edge')
  assert.equal(p.flip, 1, 'travelling right is the way a seated rabbit faces in rtl')
})

test('offsets rise from 0 to 1, and the pause happens once', () => {
  const { frames } = keyframes(plan({ seatLeft: 380, seatWidth: 46, viewport: 1440, rtl: false }))
  for (let i = 1; i < frames.length; i++) assert.ok(frames[i].offset >= frames[i - 1].offset)
  const still = frames.filter((f, i) => i > 1 && f.transform === frames[i - 1].transform)
  assert.equal(still.length, 1, 'one pause')
})
