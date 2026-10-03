// The Switchboard page's release-bound content, derived from switchboard/release.json.
//
// The updater (update-switchboard-release.mjs) and the check (check-site.mjs) share this
// module: the updater writes `renderSwitchboardPage(html, manifest)` and the check asserts
// the page already equals it. Only three kinds of place are ever touched:
//   - elements carrying `data-release-version` (text) or `data-release-link` (href);
//   - regions between `<!-- release:NAME -->` and `<!-- /release:NAME -->`;
//   - the SoftwareApplication JSON-LD (`softwareVersion`, `license`).
// Everything else on the page, including the MIT-history sentence, is never rewritten.

// The license each release shipped with, read from `LICENSE` at its tag
// (`gh api repos/passioncode-ai/fabric-switchboard/contents/LICENSE?ref=<tag>`, 2026-09-30):
// MIT up to and including LAST_MIT_VERSION, PolyForm Noncommercial or Internal Use up to and
// including LAST_POLYFORM_VERSION, and the GNU AGPL-3.0 from the next release on (Fabric
// ADR-0092: every repository is AGPL-3.0 or commercial; a released version keeps its license).
export const LAST_MIT_VERSION = '0.3.1-beta.1'
export const LAST_POLYFORM_VERSION = '0.4.0-beta.1'
export const MIT_HISTORY = 'Releases up to and including v0.3.1-beta.1 were published under MIT and remain available under it.'
// The license texts themselves. The trailing-slash forms return 404 (curl -sI, 2026-09-29).
export const POLYFORM_LICENSE_URLS = ['https://polyformproject.org/licenses/noncommercial/1.0.0', 'https://polyformproject.org/licenses/internal-use/1.0.0']
export const MIT_LICENSE_URL = 'https://spdx.org/licenses/MIT.html'
// `curl -sI` → HTTP/2 200, 2026-09-30. The SPDX page names the exact identifier, `-only`.
export const AGPL_LICENSE_URL = 'https://spdx.org/licenses/AGPL-3.0-only.html'
// The first version whose page describes the agent tools (`switchboard mcp`, project rules).
export const AGENTS_SINCE = '0.4.0-beta.1'

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/

// Semantic Versioning 2.0.0 precedence: -1, 0 or 1.
export function compareVersions (a, b) {
  const [ma, mb] = [SEMVER.exec(a), SEMVER.exec(b)]
  if (!ma || !mb) throw new Error(`Not a semantic version: ${ma ? b : a}`)
  for (let i = 1; i <= 3; i++) {
    const d = Number(ma[i]) - Number(mb[i])
    if (d) return Math.sign(d)
  }
  if (!ma[4] || !mb[4]) return ma[4] === mb[4] ? 0 : ma[4] ? -1 : 1
  const [pa, pb] = [ma[4].split('.'), mb[4].split('.')]
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if (pa[i] === undefined) return -1
    if (pb[i] === undefined) return 1
    const [na, nb] = [/^\d+$/.test(pa[i]), /^\d+$/.test(pb[i])]
    if (na && nb && Number(pa[i]) !== Number(pb[i])) return Math.sign(Number(pa[i]) - Number(pb[i]))
    if (na !== nb) return na ? -1 : 1
    if (!na && pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1
  }
  return 0
}

// The release's checksum list. Releases built by hand named it SHA256SUMS-<version>.txt (0.3.1
// used the binary version); releases built by the release workflow publish SHA256SUMS, signed
// by SHA256SUMS.asc.
export function checksumAssetName (names, version) {
  const binaryVersion = version.split('-')[0]
  return [`SHA256SUMS-${binaryVersion}.txt`, `SHA256SUMS-${version}.txt`, 'SHA256SUMS'].find(n => names.includes(n))
}

// Notarization is claimed only from the release's own receipt: Apple accepted the app, Gatekeeper
// accepted the stapled app, and the receipt names this archive. A hand-built receipt carries
// `gatekeeper_accepted` beside `status`; the release workflow's carries it per artifact, under
// `notarization.app`.
export function notarizedFromReceipt (receipt, archiveSha256) {
  const n = receipt?.notarization ?? {}
  const app = n.app ?? {}
  const accepted = n.status === 'Accepted' &&
    (n.gatekeeper_accepted === true || (app.status === 'Accepted' && app.gatekeeper_accepted === true))
  return accepted && (!archiveSha256 || receipt.archive_sha256 === archiveSha256)
}

export function releaseFacts (manifest) {
  const mit = compareVersions(manifest.version, LAST_MIT_VERSION) <= 0
  const polyform = !mit && compareVersions(manifest.version, LAST_POLYFORM_VERSION) <= 0
  return {
    version: manifest.version,
    mit,
    polyform,
    agpl: !mit && !polyform,
    license: mit ? MIT_LICENSE_URL : polyform ? POLYFORM_LICENSE_URLS : AGPL_LICENSE_URL,
    agents: compareVersions(manifest.version, AGENTS_SINCE) >= 0,
    // Absent means false: a notarization claim needs the release's own receipt.
    macosNotarized: manifest.macosNotarized === true,
    launcherPlugin: manifest.launcherPlugin === true,
    sha256: manifest.sha256 ?? {}
  }
}

const REGIONS = {
  'macos-note': f => f.macosNotarized
    ? 'Developer ID signed and notarized by Apple. Open the ZIP, move Fabric Switchboard to Applications and open it from there.'
    : 'Developer ID signed. Not yet notarized by Apple; macOS may block the first launch. Read the installation notes before opening.',
  checksums: f => {
    const rows = [['macos', 'macOS ZIP'], ['windows', 'Windows ZIP']].filter(([os]) => f.sha256[os])
    if (!rows.length) return ''
    return `<dl class="checksums" aria-label="SHA-256 checksums">${rows.map(([os, name]) => `<div><dt>${name} · SHA-256</dt><dd><code data-release-sha256="${os}">${f.sha256[os]}</code></dd></div>`).join('')}</dl><p class="section-note">Compare before opening: <code>shasum -a 256</code> in Terminal, <code>Get-FileHash</code> in PowerShell. A different value means a different file; download it again.</p>`
  },
  'license-current': f => f.mit
    ? 'That includes the current download.'
    : f.polyform
      ? `The current download, <span data-release-version>${f.version}</span>, was released under PolyForm Noncommercial or Internal Use and keeps that license; the next release is the first under the AGPL.`
      : `The current download, <span data-release-version>${f.version}</span>, is released under the AGPL. v${LAST_POLYFORM_VERSION} was released under PolyForm Noncommercial or Internal Use and keeps that license.`,
  agents: f => f.agents ? AGENTS_SECTION(f) : ''
}

const AGENTS_SECTION = f => `<section class="section" id="agents" aria-labelledby="agents-title"><div class="section-heading"><p class="section-number">FOR AGENTS · NEW IN 0.4</p><h2 id="agents-title">Your agent can see<br>its own limits</h2><p>Switchboard includes <code>switchboard mcp</code>, a local MCP server. Claude Code, Codex or another MCP client can read the usage that’s left and move its next request to another account. No tool accepts or returns a credential.</p></div>
 <div class="feature-grid">
 <article><span class="principle-mark">01 / USAGE</span><h3>Read what’s left</h3><p>Remaining quota for each account and window, with reset times and the age of each check. Unknown usage is reported as unknown, never as zero.</p></article>
 <article><span class="principle-mark">02 / SWITCHING</span><h3>Switch before the limit</h3><p>An agent can choose the account for its session’s next request, within the same provider and pool. Changing the Claude Code login for every session on the Mac needs an explicit <code>global</code> flag.</p></article>
 <article><span class="principle-mark">03 / PROJECT RULES</span><h3>Optional project rules</h3><p>Start a project folder on a chosen account, if you want to. Rules stay visible in the app, can be paused or set to expire, and never stop rotation.</p></article>
 </div>
 <ol class="setup-steps agent-setup"><li><span>01</span><div><h3>Launch from Switchboard</h3><p>Sessions you launch from the app or the CLI get the tools when the <code>switchboard</code> CLI can be found. Isolated sessions get the read-only tools. On macOS, the Agents panel links the CLI inside the app to <code>~/.local/bin</code>.</p></div></li><li><span>02</span><div><h3>Or connect an agent yourself</h3><p><code>claude mcp add --scope user switchboard -- switchboard mcp</code><br><code>codex mcp add switchboard -- switchboard mcp</code></p></div></li>${f.launcherPlugin ? '<li><span>03</span><div><h3>Or install the PassionCode plugin</h3><p><code>npx @passioncode-ai/passioncode@latest update</code> installs the PassionCode skills, including Switchboard’s skill and its MCP server, for Claude Code and other agents on the machine.</p></div></li>' : ''}</ol>
</section>`

const REGION = /(<!-- release:([a-z-]+) -->)([\s\S]*?)(<!-- \/release:\2 -->)/g
const JSON_LD = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g

export function renderSwitchboardPage (html, manifest) {
  const f = releaseFacts(manifest)
  const seen = new Set()
  let out = html.replace(REGION, (_, open, name, _body, close) => {
    if (!REGIONS[name]) throw new Error(`Unknown release region: ${name}`)
    seen.add(name)
    return open + REGIONS[name](f) + close
  })
  for (const name of Object.keys(REGIONS)) if (!seen.has(name)) throw new Error(`Page is missing release region: ${name}`)
  out = out.replace(/(<(\w+)\b[^>]*\bdata-release-version\b[^>]*>)[^<]*(<\/\2>)/g, (_, open, _tag, close) => open + f.version + close)
  out = out.replace(/<a\b[^>]*\bdata-release-link\b[^>]*>/g, tag => tag.replace(/href="[^"]*"/, `href="${manifest.releaseUrl}"`))
  let apps = 0
  out = out.replace(JSON_LD, (whole, open, body, close) => {
    const data = JSON.parse(body)
    if (data['@type'] !== 'SoftwareApplication') return whole
    apps++
    data.softwareVersion = f.version
    data.license = f.license
    return open + JSON.stringify(data, null, 2) + close
  })
  if (apps !== 1) throw new Error(`Expected one SoftwareApplication JSON-LD block, found ${apps}`)
  return out
}

// Problems with the page for this manifest; an empty list means the page is true.
export function checkSwitchboardPage (html, manifest) {
  const problems = []
  let rendered
  try {
    rendered = renderSwitchboardPage(html, manifest)
  } catch (error) {
    return [error.message]
  }
  if (rendered !== html) problems.push('page is out of step with switchboard/release.json: run scripts/update-switchboard-release.mjs')
  if (!html.includes(MIT_HISTORY)) problems.push(`the MIT-history sentence must stay exactly: ${MIT_HISTORY}`)
  const f = releaseFacts(manifest)
  if (!f.polyform && html.includes(POLYFORM_LICENSE_URLS[0])) problems.push(`${f.version} was not released under PolyForm; its JSON-LD must not name PolyForm`)
  if (!f.mit && html.includes(MIT_LICENSE_URL)) problems.push(`${f.version} is not an MIT release; its JSON-LD must not name MIT`)
  if (!f.agpl && html.includes(AGPL_LICENSE_URL)) problems.push(`${f.version} was released before the AGPL; its JSON-LD must not name the AGPL`)
  if (f.macosNotarized === html.includes('Not yet notarized')) problems.push('the macOS note does not match the release receipt')
  if (f.agents !== html.includes('id="agents"')) problems.push(`the agent section is shown only from ${AGENTS_SINCE}`)
  return problems
}
