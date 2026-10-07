// Explicit release selection: prereleases are intentional, not mistaken for stable.
//
//   node scripts/update-switchboard-release.mjs vX.Y.Z-beta.N
//
// Reads the published GitHub release, refuses drafts and archives that are missing or not
// anonymously downloadable, takes SHA-256 values from the release's SHA256SUMS asset
// (cross-checked against GitHub's own asset digests), reads the macOS build receipt for
// notarization, checks whether the PassionCode launcher lists Switchboard's plugin, then
// writes switchboard/release.json and re-renders only the release-bound parts of
// switchboard/index.html (scripts/switchboard-release.mjs). Nothing else on the page changes.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { checkSwitchboardPage, checksumAssetName, notarizedFromReceipt, renderSwitchboardPage } from './switchboard-release.mjs'
import { TRANSLATED_LOCALES } from './pages.mjs'

const tag = process.argv[2]
if (!/^v\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(tag ?? '')) throw new Error('Usage: node scripts/update-switchboard-release.mjs vX.Y.Z-beta.N')
const repo = 'passioncode-ai/fabric-switchboard'
const gh = path => JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8' }))
const release = gh(`repos/${repo}/releases/tags/${tag}`)
if (release.draft) throw new Error('Refusing a draft release')
const version = tag.slice(1)
const binaryVersion = version.split('-')[0]
const asset = name => release.assets.find(a => a.name === name)

async function fetchText (url, what) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, { redirect: 'follow' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.text()
    } catch (error) {
      if (attempt === 3) throw new Error(`${what}: ${error.message}`)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
}

// Checksums: SHA256SUMS-<binary version>.txt, SHA256SUMS-<version>.txt, or the release
// workflow's SHA256SUMS.
const sumsName = checksumAssetName(release.assets.map(a => a.name), version)
const sumsAsset = sumsName ? asset(sumsName) : undefined
const sums = new Map()
if (sumsAsset) {
  for (const line of (await fetchText(sumsAsset.browser_download_url, sumsAsset.name)).split('\n')) {
    const match = /^([0-9a-f]{64}) [ *](.+)$/.exec(line.trim())
    if (match) sums.set(match[2], match[1])
  }
} else {
  console.warn(`warning: ${tag} has no SHA256SUMS asset; the page will not show checksums`)
}

const downloads = {}
const sha256 = {}
for (const [os, suffix] of [['macos', 'macos-universal'], ['windows', 'windows-x64']]) {
  const name = `Fabric-Switchboard-${binaryVersion}-${suffix}.zip`
  const archive = asset(name)
  if (!archive || !archive.size) throw new Error(`Missing ${os} archive ${name}`)
  const check = await fetch(archive.browser_download_url, { method: 'HEAD', redirect: 'follow' })
  if (!check.ok) throw new Error(`${os} asset is not anonymously downloadable: ${check.status}`)
  downloads[os] = archive.browser_download_url
  const listed = sums.get(name)
  const digest = archive.digest?.startsWith('sha256:') ? archive.digest.slice(7) : undefined
  if (listed && digest && listed !== digest) throw new Error(`${name}: SHA256SUMS says ${listed}, GitHub's digest is ${digest}`)
  if (sumsAsset && !listed) throw new Error(`${sumsAsset.name} does not list ${name}`)
  if (listed) sha256[os] = listed
}

// Notarization is claimed only from the release's own receipt: Apple accepted the
// submission, Gatekeeper accepted the stapled app, and the receipt names this archive.
let macosNotarized = false
const receiptAsset = asset(`Fabric-Switchboard-${binaryVersion}-macos-universal-receipt.json`)
if (receiptAsset) {
  const receipt = JSON.parse(await fetchText(receiptAsset.browser_download_url, receiptAsset.name))
  const n = receipt.notarization ?? {}
  macosNotarized = notarizedFromReceipt(receipt, sha256.macos)
  if (n.status === 'Accepted' && !macosNotarized) console.warn('warning: the receipt says Accepted but not for this archive or without Gatekeeper acceptance; the page keeps the not-notarized note')
} else {
  console.warn(`warning: ${tag} has no macOS receipt; the page keeps the not-notarized note`)
}

// The plugin line appears only once the launcher's published family lists Switchboard.
let launcherPlugin = false
try {
  const family = JSON.parse(Buffer.from(gh('repos/passioncode-ai/passioncode/contents/family.json').content, 'base64').toString('utf8'))
  launcherPlugin = family.members.some(m => m.repo === repo)
} catch (error) {
  console.warn(`warning: could not read the PassionCode launcher family (${error.message}); the plugin line stays off`)
}

const manifest = { tag, version, repository: repo, releaseUrl: release.html_url, downloads }
if (Object.keys(sha256).length) manifest.sha256 = sha256
manifest.macosNotarized = macosNotarized
manifest.launcherPlugin = launcherPlugin

// The English page and each translated one (ru/switchboard/, scripts/locales.mjs) are rendered
// from the same manifest, in their own language; nothing is written unless every page is true.
const pages = [['en', new URL('../switchboard/index.html', import.meta.url)], ...TRANSLATED_LOCALES.map(locale => [locale, new URL(`../${locale}/switchboard/index.html`, import.meta.url)])]
const rendered = pages.map(([locale, path]) => {
  const html = renderSwitchboardPage(readFileSync(path, 'utf8'), manifest, locale)
  const problems = checkSwitchboardPage(html, manifest, locale)
  if (problems.length) throw new Error(`Refusing to write an untrue page (${locale}):\n- ${problems.join('\n- ')}`)
  return [path, html]
})
writeFileSync(new URL('../switchboard/release.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n')
for (const [path, html] of rendered) writeFileSync(path, html)
console.log(`Selected public ${release.prerelease ? 'beta' : 'release'} ${tag} (checksums: ${Object.keys(sha256).join(', ') || 'none'}; macOS notarized: ${macosNotarized}; launcher plugin: ${launcherPlugin}).`)
console.log('Next: review the release notes and platform limits, update docs/brand/facts.md, then npm run check && npm run build.')
