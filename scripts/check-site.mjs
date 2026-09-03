import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const html = readFileSync(resolve(root, 'index.html'), 'utf8')
const css = readFileSync(resolve(root, 'styles.css'), 'utf8')

const requiredFiles = [
  'robots.txt',
  'sitemap.xml',
  'wrangler.json',
  'worker/index.js',
  'brand/LOCK.json',
  'assets/passioncode-mark.svg',
  'assets/favicon-64.png',
  'assets/icon-256.png',
  'assets/icon-1024.png',
  'assets/passioncode-social-card.svg',
  'assets/passioncode-social-card.png',
  'assets/passioncode-social-card.jpg'
]

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `missing ${file}`)
}

const requiredCopy = [
  'From vibe coding to passion coding.',
  'The agent-agnostic operating system for',
  'Stop managing agents one by one. Start operating projects.',
  'Hosted product in active development',
  'People remain accountable.'
]

for (const text of requiredCopy) {
  assert.ok(html.includes(text), `missing canonical copy: ${text}`)
}

assert.equal((html.match(/<h1\b/g) || []).length, 1, 'page must have exactly one h1')
assert.match(html, /<link rel="canonical" href="https:\/\/passioncode\.ai\/">/)
assert.match(html, /<meta property="og:image" content="https:\/\/passioncode\.ai\/assets\/passioncode-social-card\.png">/)
assert.match(html, /<script type="application\/ld\+json">[\s\S]*"@type": "Organization"/)
assert.ok(!/<script\s+src=/i.test(html), 'the v1 page must not depend on external scripts')
assert.ok(!/target="_blank"/i.test(html), 'new tabs are not forced')
assert.equal((html.match(/Explore PassionCode on GitHub/g) || []).length, 2, 'primary CTA must stay consistent')
assert.match(css, /@media \(max-width: 620px\)/)
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)

for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
  const pathname = match[1].split(/[?#]/, 1)[0]
  if (pathname === '/') continue
  assert.ok(existsSync(resolve(root, pathname.slice(1))), `broken local asset ${pathname}`)
}

function pngDimensions(file) {
  const data = readFileSync(file)
  assert.equal(data.toString('ascii', 1, 4), 'PNG', `${file} is not PNG`)
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) }
}

assert.deepEqual(
  pngDimensions(resolve(root, 'assets/passioncode-social-card.png')),
  { width: 1200, height: 630 },
  'social card must be 1200×630'
)
assert.deepEqual(pngDimensions(resolve(root, 'assets/favicon-64.png')), { width: 64, height: 64 })
assert.deepEqual(pngDimensions(resolve(root, 'assets/icon-256.png')), { width: 256, height: 256 })
assert.deepEqual(pngDimensions(resolve(root, 'assets/icon-1024.png')), { width: 1024, height: 1024 })

console.log(`PASS: ${requiredFiles.length} files, canonical copy, metadata, consistent CTA, responsive CSS, 1200×630 social card`)
