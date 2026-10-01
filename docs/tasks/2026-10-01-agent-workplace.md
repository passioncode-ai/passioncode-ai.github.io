# Agent workplace: website update, 2026-10-01

## Objective and scope

Operator request: explain what each project is useful for, how the tools form an
agent workplace that adapts to a workflow, and offer the available builds clearly.
The website owns public descriptions and download routing; application repositories
own native release acceptance. This change does not claim a finished Fabric loop.

Design mode: update, preserving the existing fruit/gold/plum identity, system font,
static components and operator-approved H1. Scenarios SCN-001/007/010/012 supply the
job. Locked: brand assets/tokens, the hero headline and truthful release boundaries.
Open: section order, product directory and extension instructions. Falsifiers: a
product has no useful next action; a preview reads as complete; the launcher looks
like an app installer; mobile cards or commands clip. No new motion or framework.
The existing composition is retained, so no competing visual direction was needed.

## Findings and implementation

- The homepage hid Dashboards in a release row and did not explain the launcher,
  Adapter, VR or Okolos. Six compact entries now appear before long product stories;
  each names utility, availability and a next action. `#extend` adds skills, service
  development and explicitly source-build-only projects.
- `#toolkit` names a concrete current connection: Observatory's service appears in
  Dashboards. The full Fabric coordination loop stays explicitly in development.
- The homepage's Inbox sentence implied working model replies. The preview limit
  now sits with that claim, matching the product page and its owning release.
- `/dashboards/` adds platform requirements, separately installed service/empty-list
  behavior, the v0.3.1 DMG, its full checksum, installation guide, MCP and license
  history. Sitemap, navigation, static allowlist, UX and copy projection include it.
- Browser review exposed a pre-existing 320 px overflow in Observatory's install
  instructions: the wheel filename set a flex item's minimum width. A scoped
  `min-width: 0` and wrapping rule keep the command readable at that width.
- Legacy Observatory `#start` links now resolve to the real `#get-started` setup
  section via a stable alias, guarded by `check-site.mjs`. Live legacy-host redirect
  verification remains part of production close-out.
- README's Switchboard version was stale; corrected to 0.4.1-beta.1.
- `npm audit` found three dependency findings including high-severity undici paths.
  Exact Wrangler 4.141.0 → 4.145.0 updates the affected dependency chain; audit is zero.
- Local SITE task IDs and a source manifest now feed the shared backlog contract.
  Agent instructions name canonical ownership, leases and derived publication.

## Receipts and checks

[Release inventory](../evidence/2026-10-01-workplace/releases.json) records nine public
owners from `gh release list` / `gh release view` on 2026-10-01, including assets and
GitHub digests. VR and Okolos returned no releases. Native execution was not repeated.
The Dashboards page's DMG SHA-256 equals that inventory's asset digest; its
notarization/platform statements come from the existing facts ledger and v0.3.1 owner
receipt. Earlier license-history regions remain intact.

| Executed check | Observed result |
|---|---|
| `npm ci` | installed the locked baseline; audit reported 3 findings before the update |
| `npm install --save-dev --save-exact wrangler@4.145.0`; `npm audit --omit=optional` | 0 vulnerabilities after the update |
| `npm run check` | brand lock, 13 release tests, 7 static pages, Worker routes, 35 token contrast pairs pass; minimum scoped contrast 5.29:1 |
| `npm run build` | 30 allow-listed public entries |
| `python3 scripts/extract-public-copy.py --check` | 7 projections current |
| installed super-ux `ux_lint.py docs/ux` | 0 errors |
| installed super-ux `brand_lint.py docs/brand` | 0 errors, 371 advisory registry warnings (not a clean-warning claim) |
| `npx wrangler deploy --dry-run --outdir <temporary-directory>` | bundle succeeds, no deploy |
| deliberate missing MCP call, false Inbox readiness, private visitor link, missing legacy anchor | all four rejected; originals restored ([receipt](../evidence/2026-10-01-workplace/negative-checks.json)) |
| Chromium browser review | 7 current routes × 3 widths (1280/390/320), plus 3 baseline comparisons; no horizontal overflow, broken images or console errors after fix; product navigation, keyboard skip link and FAQ pass |

Reproduce the browser check with an installed Python Playwright environment and
Chromium: serve `dist/`, then run `python scripts/check-browser.py --base-url
http://localhost:4271` (optional `--chromium` selects an existing executable;
`--baseline-url` adds the comparison). The script installs nothing.

[Browser receipt](../evidence/2026-10-01-workplace/browser.json) pins route, viewport,
state, locale, theme, motion, timestamp and source file hashes. The screenshots were
inspected: desktop hero keeps the headline dominant; the six-entry directory exposes
choices together; mobile stacks without clipping; Dashboards' download CTA is visible
in the first 390×844 viewport. Homepage primary CTA bottom: 642 px at 1280×900 and
654 px at 390×844. This is a focused visual/keyboard/reflow check, not a full WCAG
certification or screen-reader audit. Static review does not prove native installs.

- [Homepage desktop](../evidence/2026-10-01-workplace/after-home-1280.png)
- [Product directory desktop](../evidence/2026-10-01-workplace/after-directory-1280.png)
- [Homepage mobile](../evidence/2026-10-01-workplace/after-home-390.png)
- [Dashboards mobile](../evidence/2026-10-01-workplace/after-dashboards-390.png)

## Delivery and next task

Reviewed source is deployed and verified; SITE-001 is closed. The next content trigger
is an actual product release. The source and production receipt follow below.
A pre-deployment read against the old production site exercised the checker: 28/37
checks passed; the new Dashboards page was 404 and eight changed public assets
differed, as expected. All four download routes and three private-path exclusions
passed. urllib received 403 from the edge; the checker uses the existing curl
transport. This is a negative baseline, not a successful deployment receipt. The next
content trigger is an actual new product release. SITE-002 keeps the native
Switchboard screenshot follow-up; SITE-004 depends on Fabric's northbound MCP work.

Local-only: dependencies, browser virtual environment, preview state, credential
slots and raw command output. Tracked: bounded receipts and screenshots, no secrets.
Skills used: task-pipeline (bounded delivery), ux-scenarios (visitor paths),
sheleg-design (preserved-brand composition and visual critique), copywriting (voice
and public facts), evidence-docs (receipts), agent-sync (guarded leases), and external
webapp-testing/accessibility-review (browser/keyboard/reflow scope, no full conformance).

## Production receipt

Reviewed source: `f908e01e252ede755f43d187fba904a7b9469025` on main.
Cloudflare Worker version: `f0b30984-3b0c-464e-8616-1cda38d077d7`, deployed 2026-10-01
through the existing organization secret runner and `npm run deploy` (exit 0).
`python3 scripts/verify-live.py` passed all 37 checks: 30 source-identical assets,
four download routes and three private-path exclusions. [Live receipt](../evidence/2026-10-01-workplace/live.json).

The same browser gate against `https://passioncode.ai` passed 21 page/viewport cases:
seven routes at 1280, 390 and 320 px, no overflow, broken images or console errors;
product links, keyboard skip link/FAQ and the Observatory `#start` alias passed.
[Live browser receipt](../evidence/2026-10-01-workplace/live-browser/browser.json).
Use `--output-dir` to keep live evidence separate from baseline comparison images.
These follow-up documentation and checker changes do not change deployed public bytes.
