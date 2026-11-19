// SITE-073: scripts/verify-live-expect.mjs expects what the Worker serves: the built page rewritten with the
// live release snapshot, and the hreflang set of the site's, the guide-only and the held languages and the digest.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { expectFile } from './verify-live-expect.mjs'
import { HELD, SCOPED, SCOPED_LOCALES, SCOPED_SOURCE_PAGES, LOCALES } from './pages.mjs'
import { DIGEST_FILES } from './build-digest.mjs'

const committed = JSON.parse(readFileSync(new URL('../releases/current.json', import.meta.url), 'utf8'))
const read = file => readFileSync(new URL(`../${file}`, import.meta.url))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')

test('a page with release values is expected with the served snapshot, not the committed one', () => {
  const bytes = read('fabric/index.html')
  const same = expectFile('fabric/index.html', bytes, committed)
  assert.equal(same.sha256, sha(bytes), 'the committed snapshot leaves the synced source as it is')
  const newer = structuredClone(committed)
  newer.products.fabric.version = '9.9.9'
  newer.products.fabric.tag = 'v9.9.9'
  const live = expectFile('fabric/index.html', bytes, newer)
  assert.equal(live.rewritten, true)
  assert.notEqual(live.sha256, same.sha256)
})

test('non-HTML files are expected byte for byte', () => {
  const bytes = read('llms.txt')
  assert.deepEqual(expectFile('llms.txt', bytes, committed), { file: 'llms.txt', sha256: sha(bytes), rewritten: false })
})

test('a guide names the guide-only languages; a held version names none; a site-only page never names them', () => {
  const page = SCOPED_SOURCE_PAGES[0]
  const html = read('index.html')
  const guide = expectFile(page, html, committed)
  for (const l of SCOPED_LOCALES.filter(l => !HELD.has(`${l}/${page}`))) assert.ok(guide.hreflang.some(h => h.includes(`/${l}/`)), `${page} names ${l}`)
  const scoped = SCOPED_LOCALES.find(l => !HELD.has(`${l}/${page}`))
  const row = expectFile(`${scoped}/${page}`, html, committed)
  assert.equal(row.locale, scoped)
  assert.equal(row.scoped, true)
  assert.deepEqual(row.hreflang, guide.hreflang)
  const rtl = Object.keys(SCOPED.locales).find(l => SCOPED.locales[l].dir === 'rtl')
  if (rtl) assert.equal(expectFile(`${rtl}/${page}`, html, committed).dir, 'rtl')
  const home = expectFile('index.html', html, committed)
  assert.equal(home.hreflang.length, LOCALES.length + 1)
  for (const file of HELD) {
    const held = expectFile(file, html, committed)
    assert.deepEqual(held.hreflang, [], `${file} is held`)
    assert.equal(held.held, true)
  }
})

test('the digest is English with no hreflang; an unknown page is not asserted', () => {
  const html = DIGEST_FILES().find(f => f.endsWith('.html'))
  const row = expectFile(html, Buffer.from('<html lang="en">'), committed)
  assert.equal(row.locale, 'en')
  assert.deepEqual(row.hreflang, [])
  assert.equal(expectFile('design-system/unknown.html', Buffer.from('<html lang="en">'), committed).hreflang, null)
})
