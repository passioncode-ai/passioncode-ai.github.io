import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import worker from '../worker/index.js'
import release from '../switchboard/release.json' with { type: 'json' }

const config = JSON.parse(readFileSync(new URL('../wrangler.json', import.meta.url)))
assert.equal(config.name, 'passioncode-ai')
assert.equal(config.account_id, '43da56547c0f538daaf7e94c6179faae')
assert.equal(config.assets.directory, './dist')
assert.equal(config.assets.run_worker_first, true)
assert.deepEqual(config.routes, [{ pattern: 'passioncode.ai', custom_domain: true }, { pattern: 'www.passioncode.ai', custom_domain: true }])
let calls = 0
const env = { ASSETS: { fetch: async request => { calls++; return new Response(new URL(request.url).pathname, {status: 404}) } } }
const redirect = await worker.fetch(new Request('https://www.passioncode.ai/switchboard/?q=1'), env)
assert.equal(redirect.status, 301)
assert.equal(redirect.headers.get('location'), 'https://passioncode.ai/switchboard/?q=1')
for (const os of ['macos', 'windows']) {
  for (const suffix of ['', '/', '?next=https://example.com']) {
    const response = await worker.fetch(new Request(`https://passioncode.ai/switchboard/download/${os}${suffix}`), env)
    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), release.downloads[os])
    assert.equal(response.headers.get('cache-control'), 'no-store')
    assert.equal(response.headers.get('x-robots-tag'), 'noindex')
  }
}
assert.equal(calls, 0)
for (const path of ['/', '/switchboard/', '/switchboard/download/linux', '/switchboard/download/macos/extra']) {
  const response = await worker.fetch(new Request(`https://passioncode.ai${path}`), env)
  assert.equal(await response.text(), path)
}
assert.equal(calls, 4)
console.log('PASS: Worker canonical host, OS download redirects, query isolation, no-store and asset/404 fallback')
