// #region releases — docs: docs/DEPLOYMENT.md#always-current-versions
// One resolver for the version a page names and the file a download serves. The Worker's
// cron and `npm run releases:sync` both call it, so a page and its download cannot disagree.
// Pure except fetchSnapshot(), which takes its fetch() from the caller.

const SEMVER = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/

export function parseVersion (tag) {
  const m = SEMVER.exec(String(tag || '').trim())
  if (!m) return null
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ? m[4].split('.') : [] }
}

// Semantic Versioning 2.0.0 §11 precedence: a prerelease ranks below its release.
export function compareVersions (a, b) {
  const x = typeof a === 'string' ? parseVersion(a) : a
  const y = typeof b === 'string' ? parseVersion(b) : b
  if (!x || !y) throw new Error(`not a version: ${!x ? a : b}`)
  for (const k of ['major', 'minor', 'patch']) if (x[k] !== y[k]) return x[k] < y[k] ? -1 : 1
  if (!x.pre.length || !y.pre.length) return x.pre.length === y.pre.length ? 0 : (x.pre.length ? -1 : 1)
  for (let i = 0; i < Math.max(x.pre.length, y.pre.length); i++) {
    if (x.pre[i] === undefined) return -1
    if (y.pre[i] === undefined) return 1
    const nx = /^\d+$/.test(x.pre[i]); const ny = /^\d+$/.test(y.pre[i])
    if (nx && ny && +x.pre[i] !== +y.pre[i]) return +x.pre[i] < +y.pre[i] ? -1 : 1
    if (nx !== ny) return nx ? -1 : 1
    if (x.pre[i] !== y.pre[i]) return x.pre[i] < y.pre[i] ? -1 : 1
  }
  return 0
}

const versionOf = release => String(release.tag_name).replace(/^v/, '')
const assetName = (pattern, version) => pattern.replaceAll('{version}', version)
const SHA256 = /^sha256:([0-9a-f]{64})$/

// The assets a policy requires, from one GitHub release, or null when any is missing or
// has no digest: a half-uploaded release is never offered.
export function releaseAssets (policy, release) {
  const version = versionOf(release)
  const out = {}
  for (const [platform, pattern] of Object.entries(policy.assets || {})) {
    const name = assetName(pattern, version)
    const asset = (release.assets || []).find(a => a.name === name)
    const digest = asset && SHA256.exec(asset.digest || '')
    if (!asset || !digest || asset.state && asset.state !== 'uploaded') return null
    const url = `https://github.com/${policy.repository}/releases/download/${release.tag_name}/${encodeURIComponent(name)}`
    if (asset.browser_download_url && asset.browser_download_url !== url) return null
    out[platform] = { name, url, sha256: digest[1], size: asset.size ?? null }
  }
  return out
}

// The release a policy selects from GitHub's list (any order), or null.
export function pickRelease (policy, releases) {
  const usable = releases
    .filter(r => !r.draft && parseVersion(r.tag_name))
    .filter(r => releaseAssets(policy, r) !== null)
    .sort((a, b) => compareVersions(versionOf(b), versionOf(a)))
  if (policy.hold) return usable.find(r => r.tag_name === policy.hold) || null
  if (policy.channel === 'prerelease') return usable[0] || null
  return usable.find(r => !r.prerelease) || usable[0] || null
}

export function entryFor (key, policy, release) {
  const version = versionOf(release)
  return {
    key,
    name: policy.name,
    repository: policy.repository,
    page: policy.page,
    version,
    tag: release.tag_name,
    prerelease: Boolean(release.prerelease || parseVersion(version).pre.length),
    publishedAt: release.published_at || null,
    releaseUrl: `https://github.com/${policy.repository}/releases/tag/${release.tag_name}`,
    assets: releaseAssets(policy, release)
  }
}

// npm-published products: the registry's `latest` dist-tag is the version, and its GitHub
// release (when one exists) supplies the date and the notes link.
export function npmEntryFor (key, policy, version, releases = []) {
  const tag = `v${version}`
  const release = releases.find(r => r.tag_name === tag)
  return {
    key,
    name: policy.name,
    repository: policy.repository,
    page: policy.page,
    version,
    tag,
    prerelease: parseVersion(version).pre.length > 0,
    publishedAt: release?.published_at || null,
    releaseUrl: release ? `https://github.com/${policy.repository}/releases/tag/${tag}` : `https://www.npmjs.com/package/${policy.npm}/v/${version}`,
    npm: policy.npm,
    assets: {}
  }
}

// Newer wins per product; a live answer never takes a product below the bundled snapshot
// (a deleted or yanked release must not silently downgrade a download).
export function mergeSnapshots (bundled, live) {
  const products = { ...(bundled?.products || {}) }
  for (const [key, entry] of Object.entries(live?.products || {})) {
    const floor = products[key]
    if (!floor || compareVersions(entry.version, floor.version) >= 0) products[key] = entry
  }
  const times = [bundled?.generatedAt, live?.generatedAt].filter(Boolean).sort()
  return { schema: 'releases/1', generatedAt: times.at(-1) || null, products }
}

export function lookup (snapshot, path) {
  let value = snapshot?.products
  for (const part of String(path).split('.')) {
    if (value == null || typeof value !== 'object' || !Object.hasOwn(value, part)) return undefined
    value = value[part]
  }
  return value
}

export function validSnapshot (snapshot, policies) {
  if (!snapshot || snapshot.schema !== 'releases/1' || typeof snapshot.products !== 'object') return false
  for (const [key, entry] of Object.entries(snapshot.products)) {
    const policy = policies[key]
    if (!policy || entry.repository !== policy.repository || !parseVersion(entry.version)) return false
    for (const [platform, asset] of Object.entries(entry.assets || {})) {
      if (!/^[0-9a-f]{64}$/.test(asset.sha256)) return false
      if (!asset.url.startsWith(`https://github.com/${policy.repository}/releases/download/`)) return false
      if (!policy.assets?.[platform]) return false
    }
  }
  return true
}

const GITHUB = 'https://api.github.com'

// Network: each product's release list (with If-None-Match when the caller kept an ETag)
// and, for npm products, the registry's latest version. A product that fails keeps no entry
// and is reported in `errors`; the caller merges with what it already had.
export async function fetchSnapshot ({ policies, fetch, token, cache = {}, now = () => new Date() }) {
  const products = {}
  const errors = []
  const nextCache = {}
  for (const [key, policy] of Object.entries(policies)) {
    try {
      const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'passioncode.ai-site', 'X-GitHub-Api-Version': '2022-11-28' }
      if (token) headers.Authorization = `Bearer ${token}`
      const kept = cache[policy.repository]
      if (kept?.etag) headers['If-None-Match'] = kept.etag
      const response = await fetch(`${GITHUB}/repos/${policy.repository}/releases?per_page=30`, { headers })
      let releases
      if (response.status === 304 && kept?.body) releases = JSON.parse(kept.body)
      else if (response.ok) {
        const body = await response.text()
        releases = JSON.parse(body)
        if (!Array.isArray(releases)) throw new Error('GitHub answered a non-list')
        nextCache[policy.repository] = { etag: response.headers.get('etag'), body }
      } else throw new Error(`GitHub ${response.status}`)
      if (nextCache[policy.repository] === undefined && kept) nextCache[policy.repository] = kept
      if (policy.npm) {
        const npm = await fetch(`https://registry.npmjs.org/${policy.npm.replace('/', '%2F')}/latest`, { headers: { Accept: 'application/json' } })
        if (!npm.ok) throw new Error(`npm ${npm.status}`)
        const { version } = await npm.json()
        if (!parseVersion(version)) throw new Error('npm answered no version')
        products[key] = npmEntryFor(key, policy, version, releases)
      } else {
        const release = pickRelease(policy, releases)
        if (!release) throw new Error('no release carries every required asset')
        products[key] = entryFor(key, policy, release)
      }
    } catch (error) {
      errors.push({ product: key, error: String(error.message || error) })
    }
  }
  return { snapshot: { schema: 'releases/1', generatedAt: now().toISOString(), products }, errors, cache: nextCache }
}
// #endregion releases
