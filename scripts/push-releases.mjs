// #region releases-push — docs: docs/DEPLOYMENT.md#always-current-versions
// Run hourly by .github/workflows/releases-push.yml: resolve every product's current release
// with the Actions token (GitHub's rate limit for it is per repository, not per shared address)
// and send the snapshot to the Worker, signed with RELEASES_INGEST_SECRET. The Worker validates
// it with the same rules as its own cron and keeps a product's last good entry when it is
// missing here. Prints versions and failures, never a secret.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fetchSnapshot } from '../worker/releases.js'
import { platformSignature } from '../worker/leads.js'

const root = resolve(import.meta.dirname, '..')

export async function pushReleases ({ token, secret, url, fetch: fetchImpl = fetch, now = () => new Date(), policies } = {}) {
  if (!secret) throw new Error('RELEASES_INGEST_SECRET is not set')
  const products = policies || JSON.parse(readFileSync(resolve(root, 'releases/products.json'), 'utf8')).products
  const { snapshot, errors } = await fetchSnapshot({ policies: products, fetch: fetchImpl, token, now })
  if (!Object.keys(snapshot.products).length) return { ok: false, reason: 'no product answered', errors }
  const body = JSON.stringify({ ...snapshot, errors })
  const ts = String(Math.floor(now().getTime() / 1000))
  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-PC-Timestamp': ts, 'X-PC-Signature': await platformSignature(secret, ts, body) },
    body,
    signal: AbortSignal.timeout(20000)
  })
  const answer = await response.json().catch(() => ({}))
  return { ok: response.status === 200, status: response.status, answer, errors, versions: Object.fromEntries(Object.entries(snapshot.products).map(([k, v]) => [k, v.version])) }
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const result = await pushReleases({
    token: process.env.GITHUB_TOKEN,
    secret: process.env.RELEASES_INGEST_SECRET,
    url: process.env.RELEASES_INGEST_URL || 'https://passioncode.ai/api/releases/ingest'
  })
  for (const e of result.errors || []) console.log(`::warning::${e.product}: ${e.error}`)
  console.log(JSON.stringify({ ok: result.ok, status: result.status, versions: result.versions, stored: result.answer?.versions, reason: result.reason }))
  process.exit(result.ok ? 0 : 1)
}
// #endregion releases-push
