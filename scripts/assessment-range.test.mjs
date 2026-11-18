// The assessment host's Worker (worker/assessment.js): byte ranges for the film and the comic's audio, which static assets
// answer with the whole file (Safari plays no MP4 without 206, and a seek needs one); everything else passes through.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import worker, { parseRange } from '../worker/assessment.js'

const body = new Uint8Array(1000).map((_, i) => i % 251)
const assets = { fetch: async req => {
  assert.equal(new Request(req).headers.get('range'), null, 'the asset store is asked for the whole file')
  return new Response(body, { status: 200, headers: { 'Content-Type': 'video/mp4', ETag: '"e1"', 'X-Robots-Tag': 'noindex, nofollow' } })
} }
const get = (path, headers = {}, method = 'GET') => worker.fetch(new Request(`https://assessment.passioncode.ai${path}`, { method, headers }), { ASSETS: assets })

test('parseRange: a-b, a-, -n, and what is not satisfiable', () => {
  assert.deepEqual(parseRange('bytes=0-99', 1000), [0, 99])
  assert.deepEqual(parseRange('bytes=900-', 1000), [900, 999])
  assert.deepEqual(parseRange('bytes=-100', 1000), [900, 999])
  assert.deepEqual(parseRange('bytes=990-5000', 1000), [990, 999])
  assert.equal(parseRange('bytes=1000-', 1000), 'unsatisfiable')
  assert.equal(parseRange('bytes=0-1,5-6', 1000), null, 'a multi-range is answered with the whole file')
  assert.equal(parseRange('items=0-1', 1000), null)
})

test('a range of a film answers 206 with the slice and the asset headers', async () => {
  const r = await get('/story/film/film-ru.mp4', { Range: 'bytes=10-19' })
  assert.equal(r.status, 206)
  assert.equal(r.headers.get('content-range'), 'bytes 10-19/1000')
  assert.equal(r.headers.get('content-length'), '10')
  assert.equal(r.headers.get('accept-ranges'), 'bytes')
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow')
  assert.deepEqual([...new Uint8Array(await r.arrayBuffer())], [...body.slice(10, 20)])
})

test('no range: the whole file, saying ranges are accepted', async () => {
  const r = await get('/story/comic/audio/vo/again-ru.mp3')
  assert.equal(r.status, 200)
  assert.equal(r.headers.get('accept-ranges'), 'bytes')
  assert.equal((await r.arrayBuffer()).byteLength, 1000)
})

test('an unsatisfiable range answers 416 with the size', async () => {
  const r = await get('/story/film/film-en.mp4', { Range: 'bytes=5000-' })
  assert.equal(r.status, 416)
  assert.equal(r.headers.get('content-range'), 'bytes */1000')
})

test('HEAD with a range carries the headers and no body', async () => {
  const r = await get('/story/film/film-en.mp4', { Range: 'bytes=0-1' }, 'HEAD')
  assert.equal(r.status, 206)
  assert.equal(r.headers.get('content-length'), '2')
  assert.equal(r.body, null)
})

test('a page passes through untouched', async () => {
  const r = await worker.fetch(new Request('https://assessment.passioncode.ai/'), { ASSETS: { fetch: async () => new Response('page', { headers: { 'Content-Type': 'text/html' } }) } })
  assert.equal(await r.text(), 'page')
})
