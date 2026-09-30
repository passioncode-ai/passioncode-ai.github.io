# Open source under AGPL-3.0, and the repository standard — 2026-09-30

**Objective (operator decisions, 2026-09-30):** the site says what Fabric
[ADR-0092](https://github.com/passioncode-ai/fabric/blob/main/docs/adr/0092-every-repository-is-agpl-3-0-or-commercial.md)
decided — every PassionCode.ai repository is open source under `AGPL-3.0-only` or available under a
commercial license (contact@passioncode.ai) — and this repository carries the organization's
repository standard (knowledge base `repository-standard.md`, checked by org-index
`scripts/check_format.py`). ADR-0093 (the knowledge base is read first and updated last) shapes
`AGENTS.md`; ADR-0094 (every product over MCP) leaves the site without MCP, as the knowledge base
records for a site.

## Decisions this change applies

- **Products whose source is public** — Switchboard, Project Observatory, Fabric Dashboards on this
  site — are "open source under AGPL-3.0", with a commercial license available for use the AGPL
  does not cover. No price or term is written anywhere.
- **Fabric and Fabric Inbox** ship from private source. Their pages never call them open source or
  AGPL (knowledge base `licensing.md`, open question CO-KB-01); the Fabric page keeps "source is
  private", the Inbox FAQ says only that the other three tools' source is public.
- **A released version keeps its license** (ADR-0092 decision 4), read from `LICENSE` at each tag
  (`gh api "repos/passioncode-ai/<repo>/contents/LICENSE?ref=<tag>"`, 2026-09-30):
  MIT — Switchboard ≤ v0.3.1-beta.1, Observatory ≤ v0.8.1, Fabric Dashboards v0.1.0;
  PolyForm Noncommercial or Internal Use — Switchboard v0.4.0-beta.1, Observatory v0.9.0 and v0.9.1,
  Fabric Dashboards v0.2.0 and v0.3.0. Those words appear only inside `<!-- license-history -->`
  regions.
- **Switchboard's current download is v0.4.0-beta.1, a PolyForm release**, so the page says so in
  its release region ("was released under PolyForm Noncommercial or Internal Use and keeps that
  license; the next release is the first under the AGPL") and its JSON-LD keeps the two PolyForm
  URLs. The next release selected through `update-switchboard-release.mjs` renders the AGPL
  (`https://spdx.org/licenses/AGPL-3.0-only.html`) with no page edit. The homepage card and the
  meta descriptions do not call the download AGPL.
- **Observatory's page installs from source** (`git clone`), so its JSON-LD names the AGPL and no
  longer names a release version: "0.8.1 under AGPL" would have been false.
- The site repository itself: `LICENSE` (AGPL-3.0 text, SHA-256
  `0d96a4ff68ad6d4b6f1f30f713b18d5184912ba8dd389f86aa7710db079abcb0`), `COMMERCIAL-LICENSE.md` and
  `CLA.md` byte for byte from `fabric-workspace/knowledge/templates/`, `package.json` license
  `AGPL-3.0-only OR LicenseRef-PassionCode-Commercial`, README `## License`, `AGENTS.md` in the
  template's shape (Read first → knowledge base; After work).

## REQ

| # | Requirement | Verified by |
|---|---|---|
| R1 | No page says "source-available" in text or metadata | `scripts/check-site.mjs` (per-page loop; JSON-LD, `id`/`href` attributes and license-history regions excluded) |
| R2 | MIT and PolyForm appear only inside license-history regions | `scripts/check-site.mjs` |
| R3 | Fabric and Inbox pages never say AGPL or open source | `scripts/check-site.mjs` (`PRIVATE_SOURCE_PAGES`) |
| R4 | Switchboard and Observatory pages say "open source under the GNU AGPL-3.0", "commercial license is available" and contact@passioncode.ai; the homepage says the three are open source under AGPL-3.0 and a commercial license is available | `scripts/check-site.mjs` (`LICENSE_WORDING`, homepage list) |
| R5 | Switchboard JSON-LD and release region follow the release: MIT → PolyForm → AGPL | `scripts/switchboard-release.test.mjs` (three eras; planted: PolyForm JSON-LD on an AGPL release, an AGPL claim on the PolyForm release) |
| R6 | Observatory JSON-LD license is the AGPL URL | `scripts/check-site.mjs` |
| R7 | Repository standard F1–F11 | org-index `python3 scripts/check_format.py` (offline before merge, online after) |

## Checks run

- Planted defects, each watched red in a scratch copy, then restored: `SOURCE-AVAILABLE` back on the
  homepage (R1); "PolyForm" in the Observatory FAQ outside a history region (R2); "open source under
  AGPL-3.0" on the Fabric page and "AGPL" on the Inbox page (R3); the homepage AGPL sentence removed
  (R4); PolyForm URL in Observatory's JSON-LD (R6) — `check-site.mjs` exit 1 on each with the named
  assertion. In `switchboard-release.mjs`: the PolyForm guard disabled → "planted defect: PolyForm
  JSON-LD left on an AGPL release" fails; the AGPL era removed → "the release after 0.4.0-beta.1
  renders the AGPL" fails.
- `npm run check` exit 0, `npm run build` exit 0, `python3 scripts/extract-public-copy.py --check`
  exit 0; super-ux `ux_lint.py` OK; `brand_lint.py docs/brand` 2 errors / 300 warnings, the same
  two pre-existing errors as before the change (B020 `toolkit.explore`, B021 `build.follow`) and the
  same 300 B022 warnings. The brand lint checks banned terms only in `strings.md`, so R1–R3 are
  enforced by `check-site.mjs`, not by it.
- org-index `check_format.py --offline` 0 findings (8 before: F1, F3, F4, F5, F7, F8, F9, F11);
  `check_names.py --offline` 0 findings.

## Brand pack

`facts.md` rows `license`, `license short line`, `license history` (was `MIT history`),
`Switchboard license by release` and `Observatory license` now cite ADR-0092 and the tag receipts;
`terminology.md` replaces the "source-available" term and ban (the ban is now on
"source-available"), adds "commercial license", and fixes the PassionCode.ai glossary line to
ADR-0090's "organization". These are brand-voice rows, changed because the operator decided
ADR-0092; the copy was rewritten with super-ux `copywriting`.
