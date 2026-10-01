# Final check — releases, public source and MCP routes, 2026-10-01

Objective: one last pass over the public site so that every product page states the current
version, the license, download links that resolve and the MCP route (Fabric ADR-0094), and
`docs/brand/facts.md` matches the releases.

## Findings → fixes

| # | Finding (measured 2026-10-01) | Fix |
|---|---|---|
| F1 | Fabric and Fabric Inbox repositories are public since 2026-09-30 (`gh repo list passioncode-ai --json name,visibility`), but the homepage, the Fabric page, the Inbox FAQ, `README.md`, `AGENTS.md`, FLW-02 and `facts.md` said their source was private, and `check-site.mjs` refused "AGPL" on both pages | All five product pages say open source under AGPL-3.0 and link the source; the gate now requires the license wording and the source link on Fabric and Inbox and refuses "source is private" |
| F2 | The Inbox page said "no public release or signed download"; v0.8.2 is public with a signed, notarized universal DMG and a `.sha256` asset | `/inbox/` rewritten from the Inbox README at v0.8.2: what it does, Get Fabric Inbox (macOS 12+, requirements, SHA-256, release notes, limits), For agents (Settings → Agent access, `claude mcp add --transport http …/mcp`, `list_accounts`); `inbox/release.json` + Worker route `/inbox/download/macos` |
| F3 | Observatory page: "Latest release: 0.8.1" and "install from source"; v0.9.1 is out and the README installs the release wheel | Release 0.9.1, wheel + `SHA256SUMS` install step, MCP step (`claude mcp add observatory …`, `observatory_status`), the 0.9.1 PolyForm note inside a license-history region |
| F4 | Homepage and Switchboard page linked Fabric Dashboards `v0.1.0`; v0.3.0 is out | Links → `v0.3.0`, the homepage row names 0.3.0 and MCP |
| F5 | Fabric page did not say how agents reach Fabric | States that Fabric has no MCP entry for other agents yet (knowledge `products.md` "MCP gaps") |
| F7 | Observatory licence history named PolyForm only for 0.9.0 and 0.9.1; `LICENSE` at tag v0.8.2 is PolyForm too (`gh api "repos/passioncode-ai/project-observatory-dashboard/contents/LICENSE?ref=v0.8.2"`; every tag scanned 2026-10-01: v0.1.0–v0.8.1 MIT, v0.8.2–v0.9.1 PolyForm) | Homepage, Observatory FAQ and `facts.md` say 0.8.2 to 0.9.1; the gate requires it (planted old sentence → red) |
| F6 | Okolos and Fabric VR were not mentioned anywhere on the site | One sentence in the source section; no product page (neither has a release) |

Branches without a PR, compared with `main`:

- `agent/switchboard-0.4-site` (`1ead099`) — already in `main`: `git patch-id` equals `a9b4b57`.
- `agent/inbox-page-2026-09-28` (`550da57`) — superseded: its "no public release, private
  development, tested with synthetic mail" status is false since 0.8.1/0.8.2; its FAQ link fix was
  already on `main`; its feature copy (important first, agents within a reply policy) was re-checked
  against the v0.8.2 README and carried into the new page.

Neither branch was merged or deleted.

## Checks

- `npm run check` exit 0; `python3 scripts/extract-public-copy.py --check` exit 0; `npm run build`
  exit 0 (29 entries).
- Planted defects watched red: the old Inbox page (`missing anchor /inbox/#download`), "Fabric’s
  source is private" on the Fabric page, a changed SHA-256 in `inbox/release.json`, the old
  Observatory page (`observatory missing <strong>0.9.1</strong>`).
- Every external link on the six pages answers 200/302 (`curl -sI`); every download URL 302.
- SHA-256: Inbox DMG = `Fabric-Inbox-0.8.2.dmg.sha256` = GitHub digest; Observatory wheel =
  `SHA256SUMS` = digest; Switchboard archives = `SHA256SUMS-0.4.0.txt` = digest; Fabric DMG =
  release notes = digest; Dashboards DMG = digest (no sums file on that release).
- Browser (local `dist/`): 390 px wide — no element past the viewport on `/`, `/inbox/`,
  `/observatory/`, `/fabric/`.

Out of this repository (reported, not changed here): the Inbox README still says its repository is
private; the Fabric README says "This private repository"; knowledge `products.md` lists fabric,
fabric-inbox, fabric-vr and fabric-agent-contract as private; the GitHub release notes of
`fabric-v0.2.0` say Fabric's source is private (a record of that day).
