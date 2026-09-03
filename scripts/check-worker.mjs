import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const config = JSON.parse(readFileSync(resolve(root, 'wrangler.json'), 'utf8'))
const worker = readFileSync(resolve(root, config.main), 'utf8')

assert.equal(config.name, 'passioncode-ai')
assert.equal(config.account_id, '43da56547c0f538daaf7e94c6179faae')
assert.equal(config.assets.directory, './dist')
assert.equal(config.assets.binding, 'ASSETS')
assert.equal(config.assets.run_worker_first, true)
assert.deepEqual(
  config.routes,
  [
    { pattern: 'passioncode.ai', custom_domain: true },
    { pattern: 'www.passioncode.ai', custom_domain: true }
  ]
)
assert.match(worker, /url\.hostname === 'www\.passioncode\.ai'/)
assert.match(worker, /Response\.redirect\(url, 301\)/)
assert.match(worker, /env\.ASSETS\.fetch\(request\)/)

console.log('PASS: Cloudflare Worker serves assets and redirects www to the canonical apex')
