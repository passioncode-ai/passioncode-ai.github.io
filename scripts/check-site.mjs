import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pages = ['index.html', 'switchboard/index.html', 'fabric/index.html', 'inbox/index.html', 'observatory/index.html', 'design-system/index.html']
const css = readFileSync(resolve(root, 'styles.css'), 'utf8')
const release = JSON.parse(readFileSync(resolve(root, 'switchboard/release.json'), 'utf8'))
const read = path => readFileSync(resolve(root, path), 'utf8')
const downloadPaths = new Set(['/switchboard/download/macos', '/switchboard/download/windows'])
for (const file of pages) {
  const html = read(file)
  const route = file.replace(/index.html$/, '')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: exactly one h1`)
  assert.ok(html.includes(`rel="canonical" href="https://passioncode.ai/${route}"`), `${file}: canonical`)
  assert.match(html, /<meta name="description" content="[^"]+">/)
  assert.ok(!/<script\s+src=/i.test(html), `${file}: content must not need client JavaScript`)
  assert.ok(!/target="_blank"/i.test(html), 'do not force new tabs')
  assert.ok(html.includes('href="#main"'), `${file}: skip link`)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`)
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(block[1])
  for (const [, value] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    if (!value.startsWith('/') && !value.startsWith('#')) continue
    const url = new URL(value, `https://passioncode.ai/${route}`)
    if (downloadPaths.has(url.pathname)) continue
    const local = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname
    assert.ok(existsSync(resolve(root, '.' + local)), `${file}: missing ${value}`)
    if (url.hash) assert.ok(read('.' + local).includes(`id="${url.hash.slice(1)}"`), `${file}: missing anchor ${value}`)
  }
}
const home = read('index.html')
for (const text of ['Your toolkit for', 'AI-native teams.', 'From vibe coding to passion coding.', 'CEO AI agent', 'in development', 'href="/switchboard/#download"']) assert.ok(home.includes(text), `homepage missing ${text}`)
const product = read('switchboard/index.html')
for (const text of [release.version, release.releaseUrl, 'Not yet notarized', 'Unsigned beta', 'not yet verified', 'MIT']) assert.ok(product.includes(text), `product missing ${text}`)
for (const os of ['macos', 'windows']) {
  assert.ok(product.includes(`href="/switchboard/download/${os}"`))
  const target = new URL(release.downloads[os])
  assert.equal(target.origin, 'https://github.com')
  assert.ok(target.pathname.startsWith(`/${release.repository}/releases/download/${release.tag}/`))
  assert.ok(target.pathname.endsWith('.zip'))
}
assert.equal(release.repository, 'passioncode-ai/fabric-switchboard')
assert.equal(release.tag, `v${release.version}`)
assert.equal(release.releaseUrl, `https://github.com/${release.repository}/releases/tag/${release.tag}`)
assert.match(css, /@media \(max-width: 620px\)/)
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
for (const page of pages) assert.ok(read(page).includes('href="/design-system/tokens.css"'))
for (const path of ['', 'switchboard/', 'fabric/', 'inbox/', 'observatory/', 'design-system/']) assert.ok(read('sitemap.xml').includes(`<loc>https://passioncode.ai/${path}</loc>`))
console.log('PASS: 6 static pages, metadata, anchors, shared tokens, product status and both release downloads')

const fabric = read('fabric/index.html')
assert.ok(fabric.includes('no public download yet'))
assert.ok(!fabric.includes('https://github.com/passioncode-ai/fabric\"'), 'do not link visitors to private Fabric source')
for (const page of pages) assert.ok(read(page).includes('href="https://x.com/sshlg93"'), `${page}: author link`)

const observatory = read('observatory/index.html')
for (const text of ['0.4.0', 'https://github.com/passioncode-ai/project-observatory-dashboard', 'MIT', 'English or Russian', 'cannot find unknown secrets', 'Synthetic demo']) assert.ok(observatory.includes(text), `observatory missing ${text}`)
assert.ok(home.includes('href="/observatory/"'), 'homepage links Observatory')

const inbox = read('inbox/index.html')
for (const text of ['in development', 'No public release or signed download', 'Cloudflare and Gmail', 'General IMAP and Outlook', 'href="/fabric/"']) assert.ok(inbox.includes(text), `Inbox missing ${text}`)
assert.ok(!inbox.includes('github.com/passioncode-ai/fabric-inbox'), 'private source must not be a public CTA')
assert.ok(!/downloadUrl|softwareVersion|offers/.test(inbox), 'preview must not advertise a downloadable release')
assert.ok(home.includes('href="/inbox/"'), 'homepage links Inbox')
