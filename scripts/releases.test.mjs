import assert from 'node:assert/strict'
import { test } from 'node:test'
import { compareVersions, fetchSnapshot, lookup, mergeSnapshots, pickRelease, validSnapshot } from '../worker/releases.js'
import { liveJsonLd, liveValue, rewriteSource } from '../worker/live.js'

const sha = c => c.repeat(64)
const policy = {
  name: 'Fabric Switchboard',
  repository: 'passioncode-ai/fabric-switchboard',
  page: '/switchboard/',
  channel: 'stable',
  assets: { macos: 'Fabric-Switchboard-{version}-macos-universal.zip' }
}
const release = (tag, { prerelease = false, draft = false, digest = sha('a'), asset = true } = {}) => ({
  tag_name: tag,
  prerelease,
  draft,
  published_at: '2026-10-05T10:00:00Z',
  assets: asset ? [{
    name: `Fabric-Switchboard-${tag.slice(1)}-macos-universal.zip`,
    browser_download_url: `https://github.com/passioncode-ai/fabric-switchboard/releases/download/${tag}/Fabric-Switchboard-${tag.slice(1)}-macos-universal.zip`,
    digest: digest && `sha256:${digest}`,
    state: 'uploaded',
    size: 10
  }] : []
})

test('semantic version precedence, prerelease below its release', () => {
  assert.equal(compareVersions('0.6.0', '0.5.5-beta.1'), 1)
  assert.equal(compareVersions('0.6.0-beta.2', '0.6.0'), -1)
  assert.equal(compareVersions('0.6.0-beta.10', '0.6.0-beta.9'), 1)
  assert.equal(compareVersions('v1.0.0', '1.0.0'), 0)
  assert.equal(compareVersions('0.10.0', '0.9.9'), 1)
  assert.throws(() => compareVersions('latest', '1.0.0'))
})

test('stable channel skips a newer beta; prerelease channel takes it', () => {
  const list = [release('v0.6.1-beta.1', { prerelease: true }), release('v0.6.0'), release('v0.5.5-beta.1', { prerelease: true })]
  assert.equal(pickRelease(policy, list).tag_name, 'v0.6.0')
  assert.equal(pickRelease({ ...policy, channel: 'prerelease' }, list).tag_name, 'v0.6.1-beta.1')
})

test('stable channel falls back to the newest prerelease when nothing stable exists', () => {
  assert.equal(pickRelease(policy, [release('v0.3.0', { prerelease: true })]).tag_name, 'v0.3.0')
})

test('a release missing a required asset or its digest is never offered', () => {
  const list = [release('v0.7.0', { asset: false }), release('v0.6.9', { digest: null }), release('v0.6.0')]
  assert.equal(pickRelease(policy, list).tag_name, 'v0.6.0')
  assert.equal(pickRelease(policy, [release('v1.0.0', { draft: true })]), null)
})

test('a download URL that is not the repository release path is refused', () => {
  const tampered = release('v0.7.0')
  tampered.assets[0].browser_download_url = 'https://example.com/evil.zip'
  assert.equal(pickRelease(policy, [tampered, release('v0.6.0')]).tag_name, 'v0.6.0')
})

test('hold pins a tag even when newer releases exist', () => {
  assert.equal(pickRelease({ ...policy, hold: 'v0.5.0' }, [release('v0.6.0'), release('v0.5.0')]).tag_name, 'v0.5.0')
  assert.equal(pickRelease({ ...policy, hold: 'v0.4.0' }, [release('v0.6.0')]), null)
})

const entry = version => ({ key: 'switchboard', name: 'Fabric Switchboard', repository: policy.repository, version, tag: `v${version}`, publishedAt: '2026-10-05T10:00:00Z', releaseUrl: `https://github.com/${policy.repository}/releases/tag/v${version}`, assets: { macos: { name: 'x.zip', url: `https://github.com/${policy.repository}/releases/download/v${version}/x.zip`, sha256: sha('b') } } })
const snap = version => ({ schema: 'releases/1', generatedAt: '2026-10-05T00:00:00Z', products: { switchboard: entry(version) } })

test('merge takes the newer version and never downgrades below the bundled floor', () => {
  assert.equal(mergeSnapshots(snap('0.6.0'), snap('0.6.1')).products.switchboard.version, '0.6.1')
  assert.equal(mergeSnapshots(snap('0.6.0'), snap('0.5.0')).products.switchboard.version, '0.6.0')
  assert.equal(mergeSnapshots(snap('0.6.0'), { products: {} }).products.switchboard.version, '0.6.0')
})

test('validation rejects a snapshot that points outside the product repository', () => {
  const policies = { switchboard: policy }
  assert.equal(validSnapshot(snap('0.6.0'), policies), true)
  const bad = snap('0.6.0'); bad.products.switchboard.assets.macos.url = 'https://example.com/x.zip'
  assert.equal(validSnapshot(bad, policies), false)
  const foreign = snap('0.6.0'); foreign.products.switchboard.repository = 'someone/else'
  assert.equal(validSnapshot(foreign, policies), false)
  assert.equal(validSnapshot({ schema: 'other' }, policies), false)
})

test('lookup and live values', () => {
  const s = snap('0.6.0')
  assert.equal(lookup(s, 'switchboard.assets.macos.sha256'), sha('b'))
  assert.equal(lookup(s, 'switchboard.__proto__'), undefined)
  assert.equal(liveValue(s, 'switchboard.date'), '2026-10-05')
  assert.equal(liveValue(s, 'missing.version'), undefined)
})

test('source rewrite moves text, href and JSON-LD and leaves the rest alone', () => {
  const html = '<p>Release <span data-live="switchboard.version">0.5.0</span> · <a class="x" href="/old" data-live-href="switchboard.releaseUrl">notes</a> <b>0.5.0</b></p>' +
    '<script type="application/ld+json" data-live-ld="switchboard">{"@type":"SoftwareApplication","name":"Fabric Switchboard","softwareVersion":"0.5.0"}</script>'
  const out = rewriteSource(html, snap('0.6.0'))
  assert.match(out, /<span data-live="switchboard.version">0.6.0<\/span>/)
  assert.match(out, /href="https:\/\/github.com\/passioncode-ai\/fabric-switchboard\/releases\/tag\/v0.6.0"/)
  assert.match(out, /<b>0.5.0<\/b>/, 'unmarked text is untouched')
  assert.match(out, /"softwareVersion": "0.6.0"/)
  assert.equal(rewriteSource(out, snap('0.6.0')), out, 'idempotent')
  assert.equal(rewriteSource('<span data-live="nope.version">1</span>', snap('0.6.0')), '<span data-live="nope.version">1</span>')
})

test('JSON-LD only changes the named application', () => {
  const json = JSON.stringify({ '@graph': [{ '@type': 'SoftwareApplication', name: 'Other', softwareVersion: '1' }, { '@type': 'SoftwareApplication', name: 'Fabric Switchboard', softwareVersion: '0.1.0' }] })
  const out = JSON.parse(liveJsonLd(snap('0.6.0'), 'switchboard', json))
  assert.equal(out['@graph'][0].softwareVersion, '1')
  assert.equal(out['@graph'][1].softwareVersion, '0.6.0')
})

test('fetchSnapshot uses ETags, keeps a 304 body, and reports a failing product without throwing', async () => {
  const policies = { switchboard: policy, adapter: { name: 'Fabric Agent Adapter', repository: 'passioncode-ai/fabric-agent-adapter', page: '/start/', channel: 'stable', npm: '@passioncode-ai/fabric-agent-adapter', assets: {} } }
  const seen = []
  const fakeFetch = async (url, init = {}) => {
    seen.push([url, init.headers || {}])
    if (url.includes('fabric-switchboard')) return new Response(null, { status: 304 })
    if (url.includes('fabric-agent-adapter/releases')) return new Response('[]', { status: 200, headers: { etag: 'W/"2"' } })
    if (url.includes('registry.npmjs.org')) return new Response(JSON.stringify({ version: '0.8.0' }), { status: 200 })
    return new Response('nope', { status: 500 })
  }
  const cache = { 'passioncode-ai/fabric-switchboard': { etag: 'W/"1"', body: JSON.stringify([release('v0.6.0')]) } }
  const { snapshot, errors, cache: next } = await fetchSnapshot({ policies, fetch: fakeFetch, token: 't', cache })
  assert.deepEqual(errors, [])
  assert.equal(snapshot.products.switchboard.version, '0.6.0')
  assert.equal(snapshot.products.adapter.version, '0.8.0')
  assert.equal(snapshot.products.adapter.releaseUrl, 'https://www.npmjs.com/package/@passioncode-ai/fabric-agent-adapter/v/0.8.0')
  assert.equal(seen[0][1]['If-None-Match'], 'W/"1"')
  assert.equal(seen[0][1].Authorization, 'Bearer t')
  assert.equal(next['passioncode-ai/fabric-switchboard'].etag, 'W/"1"')
  assert.equal(next['passioncode-ai/fabric-agent-adapter'].etag, 'W/"2"')

  const failing = await fetchSnapshot({ policies: { switchboard: policy }, fetch: async () => new Response('x', { status: 403 }) })
  assert.deepEqual(failing.errors, [{ product: 'switchboard', error: 'GitHub 403' }])
  assert.deepEqual(failing.snapshot.products, {})
})

test('hold rolls a product back below the bundled floor on purpose', () => {
  const policies = { switchboard: { ...policy, hold: 'v0.6.0' } }
  assert.equal(mergeSnapshots(snap('0.6.2'), snap('0.6.0'), policies).products.switchboard.version, '0.6.0', 'the held tag wins over a newer floor')
  assert.equal(mergeSnapshots(snap('0.6.2'), snap('0.5.0'), policies).products.switchboard.version, '0.6.2', 'only the held tag may go below the floor')
})

test('validation answers false, never throws, on a malformed entry or asset', () => {
  const policies = { switchboard: policy }
  const broken = (mutate) => { const s = snap('0.6.0'); mutate(s.products.switchboard); return s }
  assert.equal(validSnapshot(broken(e => { e.assets.macos = null }), policies), false)
  assert.equal(validSnapshot(broken(e => { delete e.tag }), policies), false)
  assert.equal(validSnapshot(broken(e => { e.releaseUrl = 'https://evil.example/x' }), policies), false)
  assert.equal(validSnapshot({ schema: 'releases/1', products: { switchboard: null } }, policies), false)
})

test('JSON-LD written into the page cannot close its <script>', () => {
  const s = snap('0.6.0'); s.products.switchboard.version = '0.6.0'
  const json = JSON.stringify({ '@type': 'SoftwareApplication', name: 'Fabric Switchboard', softwareVersion: 'x', description: '</script><script>alert(1)</script>' })
  const out = liveJsonLd(s, 'switchboard', json)
  assert.ok(!out.includes('<'), out)
  assert.equal(JSON.parse(out).description, '</script><script>alert(1)</script>', 'still the same data once parsed')
})
