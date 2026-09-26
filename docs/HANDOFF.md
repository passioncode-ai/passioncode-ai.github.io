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
