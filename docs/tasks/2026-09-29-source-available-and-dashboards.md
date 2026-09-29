# Source-available wording, current releases and Fabric Dashboards — 2026-09-29

**Objective (operator decisions, 2026-09-29):** the public tools are described as
source-available, never "open source" or "MIT"; the site states the current releases; the
tagline names teams; Fabric Dashboards, released 2026-09-28, is listed where the family is
listed. A narrative audit of the public surfaces found the discrepancies fixed here.

## Decisions this change applies

- License of Switchboard, Project Observatory and Fabric Dashboards:
  `PolyForm-Noncommercial-1.0.0 OR LicenseRef-PolyForm-Internal-Use-1.0.0`, commercial license on
  request (contact@passioncode.ai). Releases already published under MIT stay MIT: Switchboard up
  to and including v0.3.1-beta.1, Observatory up to and including v0.8.1, Fabric Dashboards v0.1.0.
- Tagline: "The agent-agnostic operating system for AI-native teams." / "A toolkit for AI-native
  teams." Category line: "From vibe coding to passion coding."
- Fabric Dashboards gets no product page. The site has one page per product with a download
  route or a development status to explain; Dashboards has neither on this site — its signed DMG
  and checksum live on its public GitHub release. It is listed in the build pipeline, the source
  section and the design system, each linking the public repository or release.

## REQ

| # | Requirement | Verified by |
|---|---|---|
| R1 | No page says "open source"/"open-source" in text or metadata | `scripts/check-site.mjs` (per-page loop; `id`/`href` attributes excluded so the legacy `#open-source` anchor keeps old links working) |
| R2 | Switchboard and Observatory pages name source-available, PolyForm Noncommercial, Internal Use and the commercial license | `scripts/check-site.mjs` (`LICENSE_WORDING`) — replaces the former `'MIT'` requirement |
| R3 | Every `SoftwareApplication` JSON-LD `license` is the two PolyForm license URLs | `scripts/check-site.mjs` (`LICENSE_URLS`) |
| R4 | Observatory states release 0.8.1, in copy and in `softwareVersion` | `scripts/check-site.mjs` |
| R5 | Homepage description names Project Observatory; homepage lists Fabric Dashboards and links its repository and v0.1.0 release; the design system shows its mark | `scripts/check-site.mjs` |
| R6 | No page says "AI-native work" | `scripts/check-site.mjs` |
| R7 | `assets/dashboards-mark.svg` ships | `scripts/build-site.mjs` allow-list |

## Facts and their receipts

- Observatory v0.8.1: `gh release list -R passioncode-ai/project-observatory-dashboard` → "Project
  Observatory 0.8.1 · Latest · 2026-09-29"; its server speaks `fabric-service/0.1` since 0.8.0
  (CHANGELOG 0.8.0, "Added").
- Fabric Dashboards v0.1.0: `gh release list -R passioncode-ai/fabric-dashboards` → "Latest ·
  2026-09-28"; receipt asset `Fabric-Dashboards-0.1.0.receipt.json`: architectures arm64 +
  x86_64, notarization "accepted and stapled", Gatekeeper "accepted"; `LSMinimumSystemVersion`
  13.0 in `scripts/dist-mac.mjs` of that repository.
- Repository visibility (`gh api repos/passioncode-ai/<repo> --jq .visibility`, 2026-09-29):
  public — fabric-switchboard, project-observatory-dashboard, fabric-dashboards,
  project-observatory-contract, this repository; private — fabric-agent-adapter,
  fabric-agent-contract, org-index.

## Changed

Pages: `index.html`, `switchboard/index.html`, `observatory/index.html`, `inbox/index.html`,
`design-system/index.html`, `fabric/index.html` (footer anchor only). Checks and build:
`scripts/check-site.mjs`, `scripts/build-site.mjs`. Brand: `docs/brand/facts.md`,
`terminology.md`, `strings.md`, `copy/*` (regenerated). UX: SCN-004, SCN-006, new SCN-010,
FLW-02/03, SCR-01/02/03/04. `README.md`, `design-system/README.md`, `docs/HANDOFF.md`.

## Checks run

See [HANDOFF](../HANDOFF.md) for the commands, exit codes and the live verification.
