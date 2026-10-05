import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { AGPL_LICENSE_URL, checkSwitchboardPage, releaseFacts } from './switchboard-release.mjs'

const root = resolve(import.meta.dirname, '..')
const pages = ['index.html', 'switchboard/index.html', 'fabric/index.html', 'inbox/index.html', 'dashboards/index.html', 'observatory/index.html', 'design-system/index.html']
const css = readFileSync(resolve(root, 'styles.css'), 'utf8')
const release = JSON.parse(readFileSync(resolve(root, 'switchboard/release.json'), 'utf8'))
const read = path => readFileSync(resolve(root, path), 'utf8')
// Every repository is open source under AGPL-3.0 or available under a commercial license
// (Fabric ADR-0092, 2026-09-30; supersedes the source-available wording of 2026-09-29).
// Every product with a page has public source since 2026-09-30 (Fabric and Fabric Inbox were
// published that night, which resolved CO-KB-01): each page says "open source under the GNU
// AGPL-3.0" and names the commercial license; JSON-LD points at the license text itself.
// Switchboard's JSON-LD follows the selected release (MIT → PolyForm → AGPL,
// scripts/switchboard-release.mjs). A released version keeps its license, so MIT and PolyForm
// appear only inside <!-- license-history --> regions.
const LICENSE_WORDING = ['open source under the GNU AGPL-3.0', 'commercial license is available', 'contact@passioncode.ai']
const LICENSE_URLS = AGPL_LICENSE_URL
// The words a visitor or a crawler reads: no JSON-LD, no id/href attributes, no license history.
const currentWords = html => html
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  .replace(/<!-- license-history -->[\s\S]*?<!-- \/license-history -->/g, '')
  .replace(/\s(?:id|href)="[^"]*"/g, '')
const downloadPaths = new Set(['/switchboard/download/macos', '/switchboard/download/windows', '/fabric/download/macos', '/inbox/download/macos'])
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
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(block[1])
    const expected = file === 'switchboard/index.html' ? releaseFacts(release).license : LICENSE_URLS
    if (data['@type'] === 'SoftwareApplication') assert.deepEqual(data.license, expected, `${file}: JSON-LD license must match the release it describes`)
  }
  // aria-current belongs to navigation only: a link pasted into a sentence carries it along.
  assert.ok(!/aria-current/.test(html.slice(html.indexOf('<main'), html.indexOf('</main>'))), `${file}: aria-current inside main (navigation pasted into content?)`)
  // Attributes are excluded: the legacy #open-source anchor keeps old links working.
  const words = currentWords(html)
  assert.ok(!/source[- ]available/i.test(words), `${file}: the tools are open source under AGPL-3.0, no longer source-available (ADR-0092)`)
  assert.ok(!/PolyForm|\bMIT\b/.test(words), `${file}: MIT and PolyForm name only released versions, inside a license-history region`)
  assert.ok(!/AI-native work\b/.test(words), `${file}: the tagline is "AI-native teams"`)
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
for (const text of ['The agent-agnostic operating system for', 'AI-native teams', 'From vibe coding to passion coding', 'CEO AI agent', 'in development', 'href="/switchboard/#download"']) assert.ok(home.includes(text), `homepage missing ${text}`)
const product = read('switchboard/index.html')
// Honest disclosures stay on the page: Windows is not Authenticode-signed, live acceptance is tracked.
for (const text of [release.version, release.releaseUrl, 'not yet Authenticode-signed', 'tracked openly in the repository', 'Before you open it', 'href="/observatory/"', ...LICENSE_WORDING]) assert.ok(product.includes(text), `product missing ${text}`)
const releaseProblems = checkSwitchboardPage(product, release)
assert.deepEqual(releaseProblems, [], `switchboard/index.html: ${releaseProblems.join('; ')}`)
for (const os of ['macos', 'windows']) if (release.sha256?.[os] !== undefined) assert.match(release.sha256[os], /^[0-9a-f]{64}$/, `release.json sha256.${os}`)
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
for (const path of ['', 'switchboard/', 'fabric/', 'inbox/', 'observatory/', 'dashboards/', 'design-system/']) assert.ok(read('sitemap.xml').includes(`<loc>https://passioncode.ai/${path}</loc>`))
console.log('PASS: 7 static pages, metadata, anchors, shared tokens, product status and the release downloads')

const fabric = read('fabric/index.html')
const fabricRelease = JSON.parse(read('fabric/release.json'))
assert.ok(fabric.includes('href="/fabric/download/macos"'), 'Fabric offers its macOS download through the Worker route')
assert.ok(fabric.includes('Early preview'), 'Fabric is labelled an early preview')
for (const text of ['Apple silicon', 'Docker', 'Supabase CLI', 'does not reply yet', 'no MCP entry of its own', ...LICENSE_WORDING]) assert.ok(fabric.includes(text), `Fabric page must say: ${text}`)
assert.ok(fabric.includes(`data-release-version>${fabricRelease.version}<`), 'the page names the release the manifest selects')
assert.ok(fabric.includes(fabricRelease.releaseUrl), 'the page links the public release notes')
// Since 0.3.0 Fabric is released from CI in its own repository (Fabric ADR-0111), as Switchboard is.
assert.equal(fabricRelease.repository, 'passioncode-ai/fabric', 'the Fabric download is the release in the Fabric repository')
assert.equal(fabricRelease.tag, `v${fabricRelease.version}`)
assert.equal(fabricRelease.releaseUrl, `https://github.com/${fabricRelease.repository}/releases/tag/${fabricRelease.tag}`)
const fabricTarget = new URL(fabricRelease.downloads.macos)
assert.equal(fabricTarget.origin, 'https://github.com')
assert.ok(fabricTarget.pathname.startsWith(`/${fabricRelease.repository}/releases/download/${fabricRelease.tag}/`))
assert.ok(fabricTarget.pathname.endsWith('-arm64.dmg'))
assert.match(fabricRelease.sha256, /^[0-9a-f]{64}$/)
for (const image of ['fabric-home.jpg', 'fabric-board.jpg', 'fabric-releases.jpg']) assert.ok(fabric.includes(`/assets/${image}`), `Fabric preview ${image}`)
assert.ok(fabric.includes('href="https://github.com/passioncode-ai/fabric"'), 'Fabric links its public source')
assert.ok(!/source is private/i.test(fabric), 'Fabric source is public since 2026-09-30')
for (const page of pages) assert.ok(read(page).includes('href="https://x.com/sshlg93"'), `${page}: author link`)

const observatory = read('observatory/index.html')
for (const text of ['<strong>0.15.0</strong>', 'releases/tag/v0.15.0', 'project_observatory-0.15.0-py3-none-any.whl', 'requirements-full.lock', 'observatory_overview', 'releases/download/v0.15.0/ProjectObservatory-0.15.0-macos.zip', 'notarized by Apple', 'first under the AGPL', '0.8.2 to 0.9.1 under PolyForm', 'SHA256SUMS', 'claude mcp add observatory', 'https://github.com/passioncode-ai/project-observatory-dashboard', ...LICENSE_WORDING, 'English or Russian', 'cannot find unknown secrets', 'Synthetic demo']) assert.ok(observatory.includes(text), `observatory missing ${text}`)
assert.ok(home.includes('href="/observatory/"'), 'homepage links Observatory')
assert.match(home, /<meta name="description" content="[^"]*Project Observatory/, 'homepage description names Observatory')
assert.ok(home.includes('Fabric Dashboards'), 'homepage lists Fabric Dashboards')
for (const text of ['Fabric, Fabric Inbox, Switchboard, Observatory and Fabric Dashboards are open source under AGPL-3.0', 'A commercial license is available']) assert.ok(home.includes(text), `homepage missing ${text}`)
for (const url of ['https://github.com/passioncode-ai/fabric-dashboards', 'https://github.com/passioncode-ai/fabric', 'https://github.com/passioncode-ai/fabric-inbox']) assert.ok(home.includes(`href="${url}"`), `homepage links ${url}`)
assert.ok(read('design-system/index.html').includes('/assets/dashboards-mark.svg'), 'design system shows the Fabric Dashboards mark')

const inbox = read('inbox/index.html')
const inboxRelease = JSON.parse(read('inbox/release.json'))
for (const text of ['Development preview', 'General IMAP and Outlook', 'not yet been tried with a real model call', 'href="/fabric/"', 'href="/inbox/download/macos"', 'Settings → Agent access', '/mcp', ...LICENSE_WORDING]) assert.ok(inbox.includes(text), `Inbox missing ${text}`)
assert.ok(inbox.includes(`data-release-version>${inboxRelease.version}<`), 'the Inbox page names the release the manifest selects')
assert.ok(inbox.includes(`"softwareVersion": "${inboxRelease.version}"`), 'Inbox JSON-LD names the selected release')
assert.ok(inbox.includes(`data-release-sha256="macos">${inboxRelease.sha256}<`), 'the Inbox page shows the selected DMG checksum')
assert.ok(inbox.includes(`href="${inboxRelease.releaseUrl}"`), 'the Inbox page links the public release notes')
assert.ok(inbox.includes('href="https://github.com/passioncode-ai/fabric-inbox"'), 'Inbox links its public source')
assert.equal(inboxRelease.repository, 'passioncode-ai/fabric-inbox')
assert.equal(inboxRelease.tag, `v${inboxRelease.version}`)
assert.equal(inboxRelease.releaseUrl, `https://github.com/${inboxRelease.repository}/releases/tag/${inboxRelease.tag}`)
const inboxTarget = new URL(inboxRelease.downloads.macos)
assert.equal(inboxTarget.origin, 'https://github.com')
assert.equal(inboxTarget.pathname, `/${inboxRelease.repository}/releases/download/${inboxRelease.tag}/Fabric-Inbox-${inboxRelease.version}.dmg`)
assert.match(inboxRelease.sha256, /^[0-9a-f]{64}$/)
assert.ok(home.includes('href="/inbox/#download"'), 'homepage offers the Inbox download')
assert.ok(home.includes('href="/inbox/"'), 'homepage links Inbox')

const dashboards = read('dashboards/index.html')
for (const text of ['macOS 13', 'Apple silicon', 'Intel', 'list_services', 'Services are installed separately', 'Release 0.3.1 is the first under the AGPL', ...LICENSE_WORDING]) assert.ok(dashboards.includes(text), `Dashboards missing ${text}`)
assert.ok(home.includes('href="/dashboards/#download"'))
assert.ok(dashboards.includes('https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.3.1'))
assert.ok(dashboards.includes('4ef44362566c3c05e6603266f52ba018f70b384ab7f4487c2fc4b305afe8f3d1'))
for (const path of ['/dashboards/', '/#extend']) assert.ok(home.includes(`href="${path}"`))
for (const name of ['PassionCode.ai launcher', 'Fabric Agent Adapter', 'Fabric Agent Contract', 'Fabric VR', 'Okolos']) assert.ok(home.includes(name), `directory missing ${name}`)
assert.ok(home.includes('real-model replies are not yet verified'), 'Inbox preview limits must accompany the homepage promise')
for (const file of pages) {
 const html = read(file)
 assert.equal((html.match(/aria-label="Footer navigation"/g) || []).length, 1, `${file}: one footer navigation landmark`)
 assert.ok(!/href="https:\/\/github.com\/passioncode-ai\/(?:fabric-workspace|org-index)(?:["/#])/.test(html), `${file}: private repository visitor link`)
}

assert.match(observatory, /id="get-started"[^>]*><span id="start"/, 'legacy #start lands in the Observatory setup section')
