# Current handoff — open source under AGPL-3.0 and the repository standard, 2026-09-30

Objective: apply Fabric ADR-0092 to the public words — Switchboard, Project Observatory and Fabric
Dashboards are open source under AGPL-3.0 with a commercial license available; released versions
keep MIT or PolyForm; Fabric and Fabric Inbox, whose source is private, are never called AGPL — and
bring this repository onto the organization's repository standard.
[Bounded packet](tasks/2026-09-30-agpl-and-repository-standard.md) (decisions, REQ, receipts).
Changed: `index.html`, `switchboard/index.html` (release region and JSON-LD now follow three license
eras), `observatory/index.html` (JSON-LD → AGPL, no release version), `inbox/index.html` (FAQ),
`scripts/check-site.mjs` and `scripts/switchboard-release.mjs` + tests, brand facts/terminology/copy,
SCN-004/006/010, FLW-02, SCR-02/04, `README.md` (+ `## License`), `AGENTS.md` (template shape),
`LICENSE`, `COMMERCIAL-LICENSE.md`, `CLA.md`, `package.json`/lock license.
Checks: `npm run check` exit 0, `npm run build` exit 0, `extract-public-copy.py --check` exit 0,
`ux_lint.py` OK, `brand_lint.py` unchanged (2 pre-existing errors); planted defects watched red
(packet); org-index `check_format.py` 8 → 0 findings, `check_names.py` 0.
Not deployed. Precondition: the public products' `main` must carry the AGPL `LICENSE` before the
site says "open source under AGPL-3.0" live — on 2026-09-30 fabric-switchboard,
project-observatory-dashboard and fabric-dashboards still had the PolyForm text
(`gh api repos/passioncode-ai/<repo>/contents/LICENSE`).
Next task: when `python3 scripts/check_format.py --repo fabric-switchboard --repo
project-observatory-dashboard --repo fabric-dashboards` (org-index) reports no F7 finding, run
`npm ci && npm run check && npm run build && npm run deploy` from `main` and record the Worker
version and a live comparison here. Separately: Observatory's page names release 0.8.1 and
Dashboards' links v0.1.0 while v0.9.1 and v0.3.0 are out — a release-sync task for `facts.md` and
the pages.

---

# Current handoff — Switchboard v0.4.0-beta.1 selected, 2026-09-30

Objective: serve the published, notarized Switchboard 0.4.0-beta.1 from the download redirects and
the product page. Landed by fast-forward: the parked 0.4 page commit (rebased onto `main` as
`a9b4b57`; the original `agent/switchboard-0.4-site` is left untouched) and `c8a3a65`, the updater's
output for `v0.4.0-beta.1` (`switchboard/release.json` with SHA-256 and `macosNotarized: true` from the
release receipt, PolyForm JSON-LD, notarized macOS note, agents section) plus brand facts pointing at
the 0.4.0 receipts. The two planted-defect tests that assumed a 0.3.1 page now start from a page
rendered for a frozen 0.3.1 manifest (planted red: 3 tests fail when the MIT-history check and the
missing-region guard are disabled). PR [#13](https://github.com/passioncode-ai/passioncode-ai.github.io/pull/13).
Checks: `npm run check` exit 0, `npm run build` exit 0, `extract-public-copy.py --check` exit 0, PR
check pass; local Worker preview: macOS redirect → 0.4.0 ZIP, 500 px wide without horizontal overflow.
Published: source `c8a3a65` (= pushed `main`), Worker version `2cd961df-0de6-4422-9193-f4c726eed857`;
[live receipt](SWITCHBOARD_0.4_RECEIPT.json) — 28 of 28 live files equal the build, both redirects
serve archives whose SHA-256 equals `SHA256SUMS-0.4.0.txt`.
Open: the Switchboard page screenshot is still the browser demo, not the native 0.4 app; the launcher
line appears only when `passioncode/family.json` lists Switchboard (`launcherPlugin: false`).
Next task: when the launcher lists the plugin, rerun `node scripts/update-switchboard-release.mjs
v0.4.0-beta.1` and deploy.

---

# Current handoff — source-available wording and Fabric Dashboards, 2026-09-29

Objective: apply the operator's 2026-09-29 decisions to the public site — Switchboard,
Observatory and Fabric Dashboards are source-available (PolyForm Noncommercial or Internal Use,
commercial license on request; published MIT releases stay MIT), Observatory's latest release is
0.8.1, the tagline names teams, and Fabric Dashboards 0.1.0 is listed with the family.
[Bounded packet](tasks/2026-09-29-source-available-and-dashboards.md) (decisions, REQ, receipts).
Changed: all six pages (copy, metadata, JSON-LD `license` → the two PolyForm URLs, footer
anchor `/#source` with `#open-source` kept as a legacy anchor), `styles.css` (one rule: code in
the build list does not wrap), `check-site`/`build-site`, brand facts/terminology/strings/copy,
SCN-004/006/010, FLW-02/03, SCR-01..04, `README.md`, `design-system/README.md`.
Fabric Dashboards has no product page by decision (packet): pipeline row, source card and
design-system mark link its public repository and release.
Checks: `npm run check` exit 0 (4 PASS lines), `npm run build` exit 0 (28 public entries),
`extract-public-copy.py --check` exit 0, `git diff --check` exit 0; super-ux `ux_lint.py` OK;
`brand_lint.py docs/brand` 2 errors / 296 warnings — both errors pre-existing (B020
`toolkit.explore`, B021 `build.follow`), warnings all B022. Planted red: the old Observatory page
fails on JSON-LD license; the old homepage fails on "open source". Browser (local `dist/`)
1280×900 and 500×844: no horizontal overflow; five marks load on the design system.
Published: source `308a440` (fast-forward to main), Worker version `9a66aa1c-613f-4bc5-ad81-0810061f6020`; [live receipt](SOURCE_AVAILABLE_RECEIPT.json) — 8 live files equal the build.
Next task: when Switchboard or Observatory publish their first PolyForm release, update the
version rows in `facts.md` and the pages; the MIT-history sentences keep naming the last MIT tag.

---

# Current handoff — Fabric early preview download, 2026-09-29

Objective: the Fabric page offers the notarized macOS DMG with its requirements, limits and real
screenshots. [Bounded packet](tasks/2026-09-29-fabric-preview-download.md) (REQ, receipts, checks).
Changed: `fabric/index.html` (early-preview hero, «Inside Fabric», «Get Fabric»), `fabric/release.json`,
the Worker route `/fabric/download/macos`, `check-site`/`check-worker`, the build allow-list, the
homepage status lines, brand facts/strings/voice/terminology, SCN-007, FLW-02/03, SCR-05.
Published: source `8ffd874` (PR #7), Worker version `3726c08e-4a39-4d3b-8678-2edcb58c3716`;
[live receipt](FABRIC_PREVIEW_RECEIPT.json) — 9 live files equal the build, the download redirect and the
anonymously downloaded DMG (SHA-256 match, notarized) verified.
Next task: after a newer Fabric build, publish its release here, update `fabric/release.json` and
the facts row, re-take the screenshots from a fresh demo estate.

---

# Current correction — homepage hero, 2026-09-27

Objective: restore the original hero headline and make tool exploration the primary action.
Restored the exact H1 from `d5c168d` (verified with `git show d5c168d:index.html`):
“The agent-agnostic operating system for AI-native teams.”
Primary Explore the tools targets `#products`; Download Switchboard is secondary.
Updated SCN-001, its flow/screen, brand facts and generated public copy in the same change.
Upstream Inbox publication `3d44aa6` is included; no CSS or other product page changed.

Checks: npm run check and npm run build passed (6 pages, 23 public files); copy extraction
passed; brand lint 0 errors/284 advisory warnings; UX lint consistent. Browser at 1280×720
and 390×844 showed the primary CTA within the viewport and no horizontal overflow;
clicking it reached `/#products`. Published source [86acb6c](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/86acb6c3a6908f68ce1d541ee25f2de280e72ea6); [live receipt](HERO_RECEIPT.json).
All 8 checked live files match the build, both downloads and www redirect pass.
The live browser confirmed the restored H1 and primary CTA navigation to /#products.
Next task: inspect the published hero and maintain product facts from their owning releases.
Local-only: .DS_Store, dependencies, preview state and ephemeral deployment credentials.

---

<sub>ssheleg skills — task-pipeline · ux-scenarios · sheleg-design · brand-voice · copywriting · evidence-docs · agent-sync · maintaining-fabric-workspace · cloudflare</sub>

# Current handoff — website storytelling, 2026-09-26

Objective: improve the main site's content while retaining the chosen style. [Bounded brief](tasks/2026-09-26-site-storytelling.md), [UX screens](ux/screens.md), [brand facts](brand/facts.md), [verification](evidence/site-storytelling-2026-09-26.md).

Implemented on `codex/site-storytelling`: AI-native teams headline, work-cycle explanation,
download-first Switchboard feature, explicit development pipeline, public source section,
About/Twitter from verified author identity, shared responsive navigation and `/fabric/` page.
Integrated upstream `c277b7b` (Observatory launch) before publication: its page/assets/design
reference are preserved, with Observatory in the work cycle, available tools, pipeline and source.
Previous release receipts below remain historical.

Published source: [72d7ada](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/72d7adabd049a97ea06d9db4da565aea916d5b21), on `main` and `codex/site-storytelling`.
Production: [receipt](STORYTELLING_RECEIPT.json), Worker version `1a2cf6bc-ad3e-49c8-b8e7-fc9ce72fc6b9`,
deployment `fc31505e-3198-4c77-84b4-5dddf561cd33`, 2026-09-26 19:28 UTC, 100% traffic.
Live browser opened all five pages; [homepage capture](evidence/site-storytelling-live.jpg).
Fresh anonymous clone of the exact source passed npm ci (0 vulnerabilities), check, build and
all five text projections. 17 live HTTP checks passed, including build-byte comparison,
download destination/query isolation/no-store, www and private-path 404s.

Actual skills: task-pipeline — delivery/integration; ux-scenarios — visitor paths;
brand-voice — terms/facts; copywriting — page content and own humanization pass;
sheleg-design — retained-style composition; cloudflare — existing Worker publication
(the last is outside the family). No other repository or native binary changed.

Next task: review the public reading order and headline; maintain product status from actual
releases. Native beta acceptance and Fabric's private development remain separate owners.
Local-only: `.DS_Store`, dependencies, preview state and Cloudflare ephemeral credentials.

---

# PassionCode toolkit / Switchboard launch — 2026-09-26

Objective and bounded packets: [launch brief](tasks/2026-09-26-public-launch.md). Public contract: PassionCode.ai is a toolkit for AI-native work; Switchboard is the first downloadable MIT beta; Fabric is the CEO AI agent in development. The [shared design system](../design-system/README.md) owns tokens and the yellow S; Switchboard vendors reviewed hashes. No Fabric runtime UI migration is claimed.

## Owner index

| Owner | Source / entry | Status |
|---|---|---|
| Website, downloads, canonical design | `passioncode-ai/passioncode-ai.github.io`, branch `codex/switchboard-public-launch`; this handoff | deployed source `527b5ba41c4aad77512572ec5117beb27ba7fb08`; [production receipt](LAUNCH_RECEIPT.json) |
| Switchboard app / binaries | [binary source 9e20a49](https://github.com/passioncode-ai/fabric-switchboard/tree/9e20a49ad7ef917068c266eff4283180209965dc), [installation/docs b6cde09](https://github.com/passioncode-ai/fabric-switchboard/blob/b6cde090a62a7a96a2a612ada875a9684e1e3b86/docs/HANDOFF.md) | public `main`; [v0.3.1-beta.1](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.3.1-beta.1) published |
| Organization profile | [248df9b](https://github.com/passioncode-ai/.github/commit/248df9b197056faea573bbd1c7ecf47e03126f7f), branch `codex/switchboard-toolkit-launch` | published on `main`; anonymous source verified |
| Internal Fabric narrative and map | owned in private source/workspace repositories | separate private handoff; no private runtime or source published here |

## Completed and checks actually run

- Homepage, Switchboard product page and public design system; HTML is readable without client JS. Canonical URLs, descriptions, sitemap and structured data updated. Legacy passion-fruit assets remain locked. [Scenarios](ux/scenarios.md), [screen contracts](ux/screens.md), [brand facts](brand/facts.md).
- Worker fixed OS redirects use the selected [release manifest](../switchboard/release.json); 302/no-store/noindex, query isolation, trailing slash, unknown platform and asset fallback checked. Explicit tag updater supports prereleases and rejects drafts/unavailable archives.
- `npm ci`, `npm run check`, `npm run build`, `git diff --check`: PASS. Build allowlist: 17 public entries. Isolated negative probes: foreign download destination rejected; cacheable download redirect rejected. The initial cacheability probe made no mutation due to header case; corrected probe asserted mutation occurred and then failed at the expected no-store check.
- Wrangler updated from 4.128.0 to 4.141.0; `npm audit` reports 0 vulnerabilities, replacing the prior transitive high-severity findings. No full hosted suite dispatched.
- Installed super-ux `ux_lint.py`: PASS with no warnings after documenting public page contracts. `brand_lint.py`: 0 errors / 151 warnings; generic registry heuristics inspect HTML and mark some locations missing. This is not a clean-warning brand certification. Public text is projected with `scripts/extract-public-copy.py`, not inferred from class names.
- Browser review via cua: 1280×720 desktop and 390×844 mobile homepage/product; mobile design-system page. No horizontal overflow on all three mobile pages. Primary download CTA visible in first viewport. Download anchor and FAQ work; keyboard Enter expands FAQ with visible solid focus outline. Lazy screenshot loads without broken images. Synthetic app demo screenshot is explicitly labelled. This is focused review, not full WCAG or native-platform certification.
- Independent app review found the installation link pointed to maintainer build instructions; fixed to the new end-user INSTALL guide. Static/Worker contracts independently passed review.
- Both published ZIPs fetched anonymously in full and SHA-256 matched local build receipts (macOS 17,052,475 bytes; Windows 6,232,566 bytes). Source tag identifies exactly `9e20a49`. No real credentials used.

## Decisions, limits and next task

English public copy and existing fruit/gold/plum character retained. Shared canonical tokens version 1.0.0 first committed at `508e91793fcb79d6a59bd2265551dbc76f7a8f97`; app source manifest pins exact bytes. Yellow is action/brand, blue distinguishes current native identity from selected next-request route.

macOS signed, notarization NOT_RUN. Windows unsigned cross-build, native acceptance NOT_RUN. Live-provider acceptance NOT_RUN. These facts sit beside platform downloads. Next product work: operator-assisted provider acceptance, macOS notarization, Windows native acceptance/signing; then select the next verified release using the [deployment contract](DEPLOYMENT.md). Never remove beta limits merely because packaging succeeded.

Public launch complete: exact source deployed, live pages and redirects verified ([receipt](LAUNCH_RECEIPT.json)); profile published. Internal source/workspace propagation is separately tracked in its owning private repository; concurrent internal work is preserved. Dependencies, build caches, provider data, credentials and unrelated .DS_Store files remain local-only.

## Skills actually used

- task-pipeline: bounded implementation/review/delivery; ux-scenarios: visitor paths and page contracts.
- sheleg-design: shared tokens, S and visual review; brand-voice and copywriting: hierarchy and public text.
- evidence-docs: source/build/publication receipts; agent-sync: private Fabric claims; maintaining-fabric-workspace: private map publication (not a family skill).

**Made with [ssheleg skills](https://github.com/ssheleg/sshlg-skills)**

## Final public delivery receipt

- Website source `527b5ba41c4aad77512572ec5117beb27ba7fb08` equals pushed `main` at deployment; Cloudflare version `94c85821-25dd-49b8-8b76-23bfcee072bc`, deployment `82bcb8c0-11ad-44fd-a5cb-d85e91b2b551` at 2026-09-26T16:42:21Z. Later changes are docs/receipts only and do not change deployed bytes.
- Anonymous curl byte comparison passed homepage/product/design-system/tokens/demo image; both OS redirects return the selected release with no-store/noindex; www preserves path/query; unknown OS and non-allowlisted docs/.git paths return 404. [Executed verification](evidence/verify-launch.py), [JSON result](LAUNCH_RECEIPT.json), [live product screenshot](evidence/switchboard-live.jpg).
- Fresh anonymous website checkout at source SHA: npm ci, check and build PASS, audit0. Fresh Switchboard checkout `b6cde090a62a7a96a2a612ada875a9684e1e3b86`: 81 tests / 0 failed / 1 intentional Keychain test ignored, full gate PASS with scoped installed Command Line Tools. [Final app handoff](https://github.com/passioncode-ai/fabric-switchboard/blob/a1ff940/docs/HANDOFF.md).
- Cloudflare skill was additionally used to resolve CLI authentication scope and follow direct upload API documentation. Existing connector authorization was used; no access grant, persistent token or DNS change was created.

## Fabric Inbox published

The subsequent Inbox change and canonical white/dark themes are live. Entry: [Inbox handoff](INBOX_HANDOFF.md), [deployment receipt](INBOX_DEPLOYMENT.json). Deployed source `630f4f7f5c94fc36f15d9047ff487d1142c3479f` preserves the storytelling/Fabric/Observatory work and adds Inbox. All six pages and 23 public files were compared with the exact build after deployment.
