// node --test scripts/switchboard-release.test.mjs (part of npm run check)
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  AGPL_LICENSE_URL, checkSwitchboardPage, checksumAssetName, compareVersions, LAST_POLYFORM_VERSION, MIT_HISTORY, MIT_LICENSE_URL, POLYFORM_LICENSE_URLS, notarizedFromReceipt, renderSwitchboardPage
} from './switchboard-release.mjs'

const page = readFileSync(new URL('../switchboard/index.html', import.meta.url), 'utf8')
const current = JSON.parse(readFileSync(new URL('../switchboard/release.json', import.meta.url), 'utf8'))
const repo = 'passioncode-ai/fabric-switchboard'
const manifestFor = (version, extra = {}) => ({
  tag: `v${version}`,
  version,
  repository: repo,
  releaseUrl: `https://github.com/${repo}/releases/tag/v${version}`,
  downloads: {
    macos: `https://github.com/${repo}/releases/download/v${version}/Fabric-Switchboard-${version.split('-')[0]}-macos-universal.zip`,
    windows: `https://github.com/${repo}/releases/download/v${version}/Fabric-Switchboard-${version.split('-')[0]}-windows-x64.zip`
  },
  sha256: { macos: 'a'.repeat(64), windows: 'b'.repeat(64) },
  macosNotarized: false,
  launcherPlugin: false,
  ...extra
})
const next = (extra = {}) => manifestFor('0.4.0-beta.1', extra)
// A hypothetical first release after the last PolyForm one: under ADR-0092 it is AGPL.
const agplRelease = (extra = {}) => manifestFor('0.4.0-beta.2', extra)
// The last MIT release, frozen: planted defects start from a page rendered for it, so they
// keep testing the 0.3.1 → 0.4 transition whatever release the committed page selects.
const mitRelease = {
  tag: 'v0.3.1-beta.1',
  version: '0.3.1-beta.1',
  repository: repo,
  releaseUrl: `https://github.com/${repo}/releases/tag/v0.3.1-beta.1`,
  downloads: {
    macos: `https://github.com/${repo}/releases/download/v0.3.1-beta.1/Fabric-Switchboard-0.3.1-macos-universal.zip`,
    windows: `https://github.com/${repo}/releases/download/v0.3.1-beta.1/Fabric-Switchboard-0.3.1-windows-x64.zip`
  },
  sha256: {
    macos: '5bdece37fb9965019d2a1f84af45075b571b7979dca8b8c475495ff4b50bed25',
    windows: 'f3fb96619e2722bbee954eb5758800c790df6dee6e2cd4763372b1a2a9df4665'
  },
  macosNotarized: false,
  launcherPlugin: false
}
const mitPage = renderSwitchboardPage(page, mitRelease)
const jsonLd = html => JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)[1])

test('the committed page is true for the committed manifest', () => {
  assert.deepEqual(checkSwitchboardPage(page, current), [])
})

test('the committed JSON-LD names the license of the release it describes', () => {
  assert.equal(jsonLd(page).softwareVersion, current.version)
  if (compareVersions(current.version, '0.3.1-beta.1') <= 0) {
    assert.equal(jsonLd(page).license, MIT_LICENSE_URL)
    assert.ok(!page.includes(POLYFORM_LICENSE_URLS[0]), 'an MIT release never pairs with PolyForm')
    assert.ok(!page.includes('id="agents"'), 'the agent section is not shown before 0.4')
  } else if (compareVersions(current.version, LAST_POLYFORM_VERSION) <= 0) {
    assert.deepEqual(jsonLd(page).license, POLYFORM_LICENSE_URLS)
    assert.ok(!page.includes(MIT_LICENSE_URL))
    assert.ok(!page.includes(AGPL_LICENSE_URL), 'a PolyForm release never pairs with the AGPL')
  } else {
    assert.equal(jsonLd(page).license, AGPL_LICENSE_URL)
    assert.ok(!page.includes(POLYFORM_LICENSE_URLS[0]) && !page.includes(MIT_LICENSE_URL))
  }
})

test('0.4.0-beta.1 renders PolyForm, the agent section and keeps the MIT history', () => {
  const manifest = next()
  const html = renderSwitchboardPage(page, manifest)
  assert.deepEqual(checkSwitchboardPage(html, manifest), [])
  assert.deepEqual(jsonLd(html).license, POLYFORM_LICENSE_URLS)
  assert.equal(jsonLd(html).softwareVersion, '0.4.0-beta.1')
  assert.ok(html.includes(MIT_HISTORY), 'MIT-history sentence still names v0.3.1-beta.1')
  assert.ok(html.includes('id="agents"'))
  assert.ok(html.includes('switchboard mcp'))
  assert.ok(html.includes('was released under PolyForm Noncommercial or Internal Use and keeps that license'))
  assert.ok(html.includes('Not yet notarized'), 'no notarization claim without a receipt')
  assert.ok(!html.includes('@passioncode-ai/passioncode'), 'no plugin line until the launcher lists Switchboard')
  assert.ok(html.includes(`href="${manifest.releaseUrl}" data-release-link`))
  assert.ok(html.includes('aaaaaaaa'), 'checksums are shown')
  assert.equal(renderSwitchboardPage(html, manifest), html, 'rendering is idempotent')
})

test('the release after 0.4.0-beta.1 renders the AGPL and keeps the license history', () => {
  const manifest = agplRelease()
  const html = renderSwitchboardPage(page, manifest)
  assert.deepEqual(checkSwitchboardPage(html, manifest), [])
  assert.equal(jsonLd(html).license, AGPL_LICENSE_URL)
  assert.ok(!html.includes(POLYFORM_LICENSE_URLS[0]), 'the JSON-LD no longer names PolyForm')
  assert.ok(html.includes(MIT_HISTORY), 'MIT-history sentence still names v0.3.1-beta.1')
  assert.ok(html.includes('is released under the AGPL.'))
  assert.ok(html.includes('v0.4.0-beta.1 was released under PolyForm Noncommercial or Internal Use and keeps that license.'), 'the PolyForm release stays named once a later release is current')
  assert.ok(!html.includes('the next release is the first under the AGPL'))
})

test('planted defect: PolyForm JSON-LD left on an AGPL release is caught', () => {
  const manifest = agplRelease()
  const html = renderSwitchboardPage(page, manifest)
    .replace(JSON.stringify(AGPL_LICENSE_URL), JSON.stringify(POLYFORM_LICENSE_URLS, null, 2))
  const problems = checkSwitchboardPage(html, manifest)
  assert.ok(problems.some(p => p.includes('must not name PolyForm')), problems.join('; '))
})

test('planted defect: an AGPL claim on the PolyForm release is caught', () => {
  const manifest = next()
  const html = renderSwitchboardPage(page, manifest)
    .replace('was released under PolyForm Noncommercial or Internal Use and keeps that license; the next release is the first under the AGPL.', 'is released under the AGPL.')
  assert.ok(checkSwitchboardPage(html, manifest).some(p => p.includes('out of step')))
})

test('the notarized note and the plugin line follow the manifest', () => {
  const manifest = next({ macosNotarized: true, launcherPlugin: true })
  const html = renderSwitchboardPage(page, manifest)
  assert.deepEqual(checkSwitchboardPage(html, manifest), [])
  assert.ok(html.includes('notarized by Apple. Open the ZIP'))
  assert.ok(!html.includes('Not yet notarized'))
  assert.ok(html.includes('npx @passioncode-ai/passioncode@latest update'))
})

test('no checksums: the region is empty, not a placeholder', () => {
  const manifest = next({ sha256: undefined })
  const html = renderSwitchboardPage(page, manifest)
  assert.ok(html.includes('<!-- release:checksums --><!-- /release:checksums -->'))
  assert.deepEqual(checkSwitchboardPage(html, manifest), [])
})

// Planted defect: the updater before 0.4 did replaceAll(previous.version, version) over the
// whole page, which rewrote the MIT-history sentence to name the new release as MIT.
test('planted defect: the old whole-page replace is caught', () => {
  const manifest = next()
  const broken = mitPage.replaceAll(mitRelease.releaseUrl, manifest.releaseUrl).replaceAll(mitRelease.version, manifest.version)
  const problems = checkSwitchboardPage(broken, manifest)
  assert.ok(problems.some(p => p.startsWith('the MIT-history sentence')), problems.join('; '))
})

test('planted defect: an edited MIT-history sentence is caught', () => {
  const manifest = next()
  const html = renderSwitchboardPage(mitPage, manifest).replace('v0.3.1-beta.1 were published', 'v0.4.0-beta.1 were published')
  assert.ok(checkSwitchboardPage(html, manifest).some(p => p.startsWith('the MIT-history sentence')))
})

test('planted defect: a page rendered for 0.4 fails against the 0.3.1 manifest', () => {
  const html = renderSwitchboardPage(mitPage, next())
  const problems = checkSwitchboardPage(html, mitRelease)
  assert.ok(problems.length >= 1)
  assert.ok(problems.some(p => p.includes('out of step')))
})

test('planted defect: a missing release region is refused', () => {
  const broken = mitPage.replace('<!-- release:agents --><!-- /release:agents -->', '')
  assert.notEqual(broken, mitPage, 'the fixture must contain the empty agents region')
  assert.throws(() => renderSwitchboardPage(broken, next()), /missing release region: agents/)
})

test('semantic version precedence', () => {
  assert.equal(compareVersions('0.3.1-beta.1', '0.3.1'), -1)
  assert.equal(compareVersions('0.3.1-beta.1', '0.4.0-beta.1'), -1)
  assert.equal(compareVersions('0.4.0-beta.2', '0.4.0-beta.10'), -1)
  assert.equal(compareVersions('0.4.0', '0.4.0-beta.1'), 1)
  assert.equal(compareVersions('0.3.1-beta.1', '0.3.1-beta.1'), 0)
  assert.equal(compareVersions('1.0.0-alpha', '1.0.0-alpha.1'), -1)
  assert.throws(() => compareVersions('latest', '0.1.0'))
})

test('the checksum list is found under every name a release has used', () => {
  assert.equal(checksumAssetName(['SHA256SUMS-0.3.1.txt', 'x.zip'], '0.3.1-beta.1'), 'SHA256SUMS-0.3.1.txt')
  assert.equal(checksumAssetName(['SHA256SUMS-0.5.3-beta.1.txt'], '0.5.3-beta.1'), 'SHA256SUMS-0.5.3-beta.1.txt')
  assert.equal(checksumAssetName(['SHA256SUMS', 'SHA256SUMS.asc', 'a.zip'], '0.5.3-beta.2'), 'SHA256SUMS')
  assert.equal(checksumAssetName(['SHA256SUMS.asc', 'a.zip'], '0.5.3-beta.2'), undefined)
})

test('notarization is read from both receipt shapes, and only for this archive', () => {
  const hand = { notarization: { status: 'Accepted', gatekeeper_accepted: true }, archive_sha256: 'a' }
  const ci = { notarization: { status: 'Accepted', app: { status: 'Accepted', stapled: true, gatekeeper_accepted: true } }, archive_sha256: 'a' }
  assert.equal(notarizedFromReceipt(hand, 'a'), true)
  assert.equal(notarizedFromReceipt(ci, 'a'), true)
  assert.equal(notarizedFromReceipt(ci, 'b'), false, 'another archive')
  assert.equal(notarizedFromReceipt({ notarization: { status: 'Accepted', app: { status: 'Accepted' } }, archive_sha256: 'a' }, 'a'), false, 'Gatekeeper not accepted')
  assert.equal(notarizedFromReceipt({ notarization: { status: 'Invalid', app: { status: 'Accepted', gatekeeper_accepted: true } } }, undefined), false)
  assert.equal(notarizedFromReceipt({}, 'a'), false)
})
