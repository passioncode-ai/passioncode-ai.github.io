# SITE-038: the Worker cuts fields by code point

- **Change:** PR #117, merged as `ed93b2a`. `str()` in `worker/leads.js` drops the first half of a surrogate pair that a cut splits. Three tests were added to `scripts/check-worker.mjs`:
  - the emoji cut (it fails on the previous `main`; the planted-defect run was done before the PR);
  - the HMAC v1 golden vector;
  - the email golden list.
- **Gate:** `npm run check` exit 0, 114 tests pass. CI `check` on PR #117 passed.
- **Deploy:** from `main` at `ed93b2a` with `npm run deploy` through Project Observatory (`CLOUDFLARE_ACCOUNT_ID`, vault only). Worker version `6fe71891-52b5-4327-b9f2-162684240779`, 2026-10-12.
- **Live check:** `python3 scripts/verify-live.py --output docs/evidence/2026-10-12-site-038/live.json`. It reports FAIL: 77 of 257 checks.
  - Every failing check is a page that carries a product version (`/`, `/start/`, `/fabric/`, `/inbox/`, `/dashboards/`, `/observatory/`, `/switchboard/` in each language) or a download route.
  - The live release snapshot already serves newer releases (for example Fabric 0.3.5) than the sources at `ed93b2a` (0.3.4). `npm run releases:sync` would select Fabric 0.3.5, Switchboard 0.6.18, Observatory 0.24.4, adapter 0.20.0 and launcher 0.1.44.
  - The source-and-facts update is SITE-003, and the nightly `automation/release-sync` pull request (#88) carries it. Nothing in this change touches it.
  - The intake checks pass: `/api/leads/token`, a valid agent request with `dry_run=1`, and a refused one without an email.
