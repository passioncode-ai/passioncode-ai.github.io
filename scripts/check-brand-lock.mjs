import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const lock = JSON.parse(readFileSync(resolve(root, 'brand/LOCK.json'), 'utf8'))

function sha256(path) {
  return createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex')
}

for (const [path, expected] of Object.entries(lock.files)) {
  assert.equal(sha256(path), expected, `approved brand asset drifted: ${path}`)
}

for (const [alias, canonical] of Object.entries(lock.runtimeAliases)) {
  assert.equal(sha256(alias), sha256(canonical), `runtime alias differs from locked asset: ${alias}`)
}

const packRoot = 'brand/brand-pack'
const pack = JSON.parse(readFileSync(resolve(root, `${packRoot}/manifest.json`), 'utf8'))
assert.equal(pack.sourceSha256, sha256('brand/favicon/source/passioncode-passion-fruit.svg'))

for (const asset of pack.exports) {
  const path = `${packRoot}/${asset.path}`
  assert.equal(sha256(path), asset.sha256, `brand-pack export drifted: ${path}`)
}

console.log(`PASS: brand lock holds ${Object.keys(lock.files).length} canonical files, ${pack.exports.length} exports and ${Object.keys(lock.runtimeAliases).length} runtime aliases`)
