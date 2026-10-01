# Display-copy refinement — 2026-10-01

Surface: seven public website pages; an editorial update to the existing identity.
Job: SCN-001/005/006/007/009/010 visitors can scan the product purpose and next action.
Constraint: preserve product availability, release facts, brand assets and navigation.
Failure condition: decorative sentence stops remain in headings, a generated release
restores them, or rewritten copy overflows at 320/390/1280 px.

## Implementation and editorial review

- Headings and short captions use no terminal full stops, including fragments before
  a line break. Inline headline fragments now use natural coordination.
- Each hero introduction is one sentence explaining its existing utility. Inbox's
  permissions and Fabric's in-development qualification remain explicit.
- Normal prose, questions, product-name dots, release numbers, URLs and commands
  retain their punctuation. Seven public-copy projections are regenerated.
- `scripts/switchboard-release.mjs` carries the same heading convention, so the
  release renderer does not restore punctuation. Existing site expectations now
  match the operator's requested headline spelling.

Humanization: on — own editorial pass, focused on unnecessary sentence fragments,
clarity and supported claims. No product capabilities or availability claims added.

## Evidence and next action

The existing site/release/Worker/token gate, generated-copy parity and build checks
are the acceptance commands; viewport/browser and live receipts are recorded below.
No new test suite was added for a reversible copy change. Current source before this
change: `bfad80ba1f76dccc9b9ce3b810e547cd85498862`.

Routes were read from repository AGENTS.md and the installed copywriting and
sheleg-design skills. Used: copywriting for display text; sheleg-design for visual
rhythm; task-pipeline for reviewed source delivery; evidence-docs for scoped
verification; agent-sync for the handoff lease; webapp-testing for browser checks.
The latter is a verification tool within the existing design route.

Next action before closure: verify narrow layouts, commit and push reviewed main,
deploy through the existing production account, then verify public bytes and routes.
Workspace consumes this source through its existing scheduled sync.

## Local acceptance

- `npm run check`: exit 0; 13 release tests, all seven page contracts, Worker
  redirects and scoped token checks pass. Generated Switchboard output matches.
- `python3 scripts/extract-public-copy.py --check` and `npm run build`: exit 0.
- HTMLParser inventory: 82 display blocks had line-ending full stops before; none
  remain in the measured headings, hero introductions/reframe or figure captions.
  [Per-page counts and source hashes](../evidence/2026-10-01-display-copy/punctuation.json).
- Existing `scripts/check-browser.py`: 21 current page/viewport cases at
  1280/390/320 px plus three baseline homepage cases; no overflow, broken images
  or console errors. Product navigation, keyboard skip/FAQ and legacy anchor pass.
  [Browser receipt and before/after screenshots](../evidence/2026-10-01-display-copy/browser.json).
- Visual review: homepage desktop/mobile and each product/design-system hero keep
  readable line breaks and CTA spacing. This is a scoped visual judgment.
- Installed super-ux `ux_lint.py docs/ux`: 0 errors; `brand_lint.py docs/brand`:
  0 errors, 372 advisory registry/calibration warnings, not a clean-warning result.
  This repository uses the installed linters; it does not have local lint.py or
  validate.py wrappers. Full accessibility conformance was not reassessed.

## Production receipt

Deployed source: `d9dd06ab2cdabd7a624a1169d6d3db230e0617f3`, verified equal to
remote main before deployment. Cloudflare Worker version:
`61c4218f-ccfa-477a-b569-5cec86a2bc4c`. Deployment completed through the existing
production account with `npm run deploy`; no credentials are included here.

- [Hosted check](https://github.com/passioncode-ai/passioncode-ai.github.io/actions/runs/36904591993): success on that exact source.
- [Live receipt](../evidence/2026-10-01-display-copy/live.json): 30 public assets
  match the build, all four download routes pass and three private paths remain excluded.
- [Live browser receipt](../evidence/2026-10-01-display-copy/live-browser/browser.json):
  21 cases, seven pages at 1280/390/320 px; no overflow, image failure or console error;
  navigation, keyboard checks and the Observatory legacy anchor pass.
- Fresh remote-main checkout resolves the task, current handoff, brand convention,
  homepage and release renderer at the deployed source SHA.

Complete for this editorial change. The next task is normal product maintenance
under the recorded display-copy convention; the existing scheduled Workspace sync
will import these source documents. This is not a new native-product release.
