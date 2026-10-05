# Current handoff — onboarding, commercial intake and always-current versions, 2026-10-05

Objective (operator, 2026-10-05; roadmap RM-14/RM-15): make the product family the focus; onboard
visitors (create your workplace → create agents → convert what you have → run and see them; open
source and free); vision "do what you love"; personal / contribute / commercial paths; a /business/
funnel with a savings estimate whose submissions reach the organization's backend; versions that
are always current; SEO and motion; the header kept.
Task and receipts: [tasks/2026-10-05-onboarding-commercial.md](tasks/2026-10-05-onboarding-commercial.md).
Next task: after deploy, verify live (DEPLOYMENT → Verification, plus `/api/releases`, one test
enquiry from /business/ marked as a test), then connect the Platform once deployed
(`PLATFORM_URL`, `PLATFORM_INTAKE_SECRET`; passioncode-platform PLAT-003).

---

# Current handoff — display-copy regression guard, 2026-10-01

Objective: prevent decorative title/hero periods from returning through agents or
release generators. The mandatory source gate covers semantic and styled display
roles; copy projections retain heading structure. One missed typography specimen
was fixed. [Task, baseline plants and checks](tasks/2026-10-01-copy-guard.md).
Published source `2513989fe3fdd423df5679aec6a3e24756824d32`, Worker
`e00ec2e7-51ac-4445-9bb0-bdba53e2bab2`: hosted checks, 37 live asset/route
checks and three live specimen widths pass. Next: keep the source corpus aligned
with sitemap/build entries when adding a page. General copywriting and design skill changes are owned by their separate
ssheleg repositories. Model outcome evaluation remains NOT_RUN.

---

# Current handoff — display-copy refinement, 2026-10-01

Operator request: remove decorative full stops, especially in heroes, and review
the copy more carefully. Seven pages now share the display punctuation convention;
hero introductions are concise and the generated Switchboard section agrees.
[Task and verification](tasks/2026-10-01-display-copy.md). Published and verified at source `d9dd06ab2cdabd7a624a1169d6d3db230e0617f3`,
Worker `61c4218f-ccfa-477a-b569-5cec86a2bc4c`: all 37 live asset/route checks and
21 live browser cases pass. The linked task contains the receipts. Next: preserve this convention when
updating product pages or generated release copy; product tasks stay in the local board.

---

# Current handoff — composable agent workplace, 2026-10-01

Objective: explain each tool’s utility and how to adapt an agent workplace.
Implemented: homepage product directory and workflow/extension paths, /dashboards/
with pinned download and MCP setup, honest preview boundaries, consistent navigation,
Wrangler security update and the federated local backlog.
Checks and screenshots: [bounded task](tasks/2026-10-01-agent-workplace.md).
Deployment: pending parent review and reviewed-main publication; no live claim yet.
Next task: land source, deploy with the existing organization account, verify every
asset/redirect, append the receipt and close SITE-001. Remaining work is canonical in
[the local backlog](backlog.md), not repeated as independently editable statuses here.

---

# Current handoff — the Observatory Mac app download, 2026-10-03

Objective: the Observatory page offers the Mac app that release 0.13.0 now carries,
`ProjectObservatory-0.13.0-macos.zip`, signed with a Developer ID and notarized by Apple.
Changed:
- `observatory/index.html`: a note under Get started with the direct release link;
- `docs/brand/facts.md`: platforms row;
- `scripts/check-site.mjs`: the page must link the zip and say "notarized by Apple";
- generated copy.

Checks: `npm run check` exit 0, `npm run build` exit 0. The link answers 302 to GitHub's asset
store.
Deploy: from `main` with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory).
Next task: unchanged. A newer Observatory release updates the version, wheel, app zip and facts
in one change.

---

# Current handoff — Project Observatory 0.13.0 named, 2026-10-03

Objective: the homepage card, the Observatory page and the facts name
[Project Observatory v0.13.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.13.0),
which ships the three audit-and-fix runs over 0.12.0.
Changed:
- `index.html`: card, section note and product line say release 0.13.0.
- `observatory/index.html`:
  - latest release, wheel name and release link;
  - step 01 installs the wheel with `--no-deps`, then its `[full]` extra under the `requirements-full.lock` it carries (the engine README's two-step install);
  - step 04 asks for `observatory_overview`, the MCP server's own starting tool, instead of `observatory_status`, which unpaged returns every project;
  - the license-history note says 0.13.0 is under the AGPL like every release since 0.10.0, the first.
- `scripts/check-site.mjs`: the page must name 0.13.0, its tag, its wheel, `requirements-full.lock` and `observatory_overview`.
- `docs/brand/facts.md`: release row with the SHA-256 from `SHA256SUMS`, equal to the GitHub digest and to a re-download; license row.
- SCN-006.
- generated copy.
Checks: `npm run check` exit 0 (it includes `extract-public-copy.py --check`), `npm run build` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory). The Worker version and live check are recorded in Project Observatory's private `docs/runs/2026-10-03-release-0.13.0/`.
Next task: unchanged. When a product publishes a newer release, update its manifest or link, page and facts row in one change.

---

# Current handoff — Project Observatory 0.10.0 named, 2026-10-01

Objective: the homepage card, the Observatory page and the facts name
[Project Observatory v0.10.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.10.0),
its first release under the AGPL.
Changed: `index.html` (card and section note: release 0.10.0), `observatory/index.html` (latest release,
wheel name, release link; the license-history note now says 0.10.0 is the first AGPL release and 0.9.1 and
earlier keep their license), `scripts/check-site.mjs` (the page must name 0.10.0, its tag, its wheel and
"first under the AGPL"; watched red with the old `<strong>0.9.1</strong>` planted), `docs/brand/facts.md`
(Observatory release row with the wheel SHA-256 from `SHA256SUMS`, equal to the GitHub digest; license row;
license history: Observatory v0.10.0 under AGPL-3.0), SCN-006, `README.md`, generated
copy. The homepage license-history sentence is unchanged — it names only MIT and PolyForm releases, and
0.8.2 to 0.9.1 stay PolyForm. The site names no launcher or adapter version, so neither changed here.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0, `npm run build` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory); the
Worker version and live check are recorded in Project Observatory's `docs/runs/2026-10-01-release-0.10.0/`.
Next task: unchanged — when a product publishes a newer release, update its manifest or link, page and facts row
in one change.

---

# Current handoff — Fabric Dashboards 0.3.1 named, 2026-10-01

Objective: the homepage row, the Switchboard family link and the facts name
[Fabric Dashboards v0.3.1](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.3.1), the release
that stops false "not answering" notifications (Dashboards ADR-0008) and its first release under the AGPL.
Changed: `index.html` (row: release 0.3.1 and its link), `switchboard/index.html` (Dashboards release link),
`scripts/check-site.mjs` (the homepage must link v0.3.1), `docs/brand/facts.md` (Dashboards status row with the
DMG SHA-256 from the release's `.sha256` asset and both notarization ids; licence history: Dashboards v0.3.1 under
AGPL-3.0), SCN-010, `README.md`, generated copy. The homepage licence-history sentence is unchanged — it names
only MIT and PolyForm releases, and v0.2.0/v0.3.0 stay PolyForm.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory); the
Worker version and live check are recorded in the Dashboards repository's `docs/HANDOFF.md` → Release 0.3.1.
Next task: unchanged — when a product publishes a newer release, update its manifest or link, page and facts row
in one change.

---

# Current handoff — Switchboard v0.4.1-beta.1 selected, 2026-10-01

Objective: the Switchboard page and download redirects select
[v0.4.1-beta.1](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.4.1-beta.1), the
release that stops the repeated macOS Keychain dialogs and the first Switchboard release under the AGPL.
Changed: `switchboard/release.json` and the release-bound regions of `switchboard/index.html`
(`node scripts/update-switchboard-release.mjs v0.4.1-beta.1`: JSON-LD `softwareVersion` 0.4.1-beta.1 and
`license` AGPL-3.0-only, checksums, release link); `scripts/switchboard-release.mjs` — the AGPL-era
licence sentence now also names v0.4.0-beta.1 as the PolyForm release, so the page keeps the whole
history once a later release is current (test in `switchboard-release.test.mjs`, watched red before the
change); `docs/brand/facts.md` Switchboard rows (release, checksums, licence by release, notarization
`c93a1bdc-1ad3-4dff-9056-b8250c3eea2a`, macOS/Windows receipts, licence history); generated copy.
Checks: `npm run check` exit 0 (13 release tests), `extract-public-copy.py --check` exit 0, `npm run build`
exit 0 (29 entries).
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory);
the Worker version and live redirect check are recorded in the Switchboard repository's
`docs/evidence/release-0.4.1.md` → Website.
Next task: unchanged — when a product publishes a newer release, update its manifest, page and facts row
in one change.

---

# Current handoff — final check: releases, public source and MCP routes, 2026-10-01

Objective: every product page states the current version, license, resolving downloads and the MCP
route; `facts.md` matches the releases. [Bounded packet](tasks/2026-10-01-final-check.md) (findings,
branch comparison, checks).
Changed: `index.html`, `fabric/index.html`, `inbox/index.html` (rewritten for 0.8.2) + `inbox/release.json`,
`observatory/index.html` (0.9.1, wheel install, MCP step), `switchboard/index.html` (Dashboards link),
`worker/index.js` (`/inbox/download/macos`), `check-site`/`check-worker`/`build-site`, brand
facts/terminology/strings/copy, SCN-006/009/010, FLW-01/02/03, SCR-05/06, `README.md`, `AGENTS.md`,
`docs/DEPLOYMENT.md`.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0, `npm run build` exit 0
(29 entries); four planted defects watched red (packet).
Published: source `88c9640` (squash of PR #20, = pushed `main`), Worker version
`a1d20ec1-0052-40bf-b371-09bd2eaa452c` (`npm run deploy` with `CLOUDFLARE_ACCOUNT_ID` from Project
Observatory); live check 2026-10-01: 29 of 29 live files equal the build, `/inbox/download/macos` and
`/fabric/download/macos` 302 to their release DMGs, `www` 301 to the apex.
Follow-up (same day, PR #21): Observatory v0.8.2 added to the PolyForm licence history on the
homepage, the Observatory FAQ and `facts.md` (packet F7), then redeployed from `111ce81`: Worker
version `a5edeb0e-18c8-4288-9fb0-e3d624463f64`, 29 of 29 live files equal the build.
Next task: when Fabric, Inbox, Observatory or Dashboards publish a newer release, update its
manifest or link, the page and the facts row in one change; when Fabric's agent hub ships an MCP
entry, replace the "no MCP entry" sentence on `/fabric/`.

---

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
(packet); org-index `check_format.py` 8 → 0 findings (offline before merge, online after), `check_names.py` 0.
Published: source `42784ed` (fast-forward to `main`, PR #15), after the precondition held — the
AGPL `LICENSE` on `main` of fabric-switchboard, project-observatory-dashboard, fabric-dashboards and
fabric-agent-adapter; Worker version `8e17579f-b486-4882-9c49-3aac672990a1`;
[live receipt](AGPL_RECEIPT.json) — 28 of 28 live files equal the build.
Next task: release sync — Observatory's page names release 0.8.1 and
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
