# Review of the onboarding and commercial-intake work — 2026-10-06

Objective: check what the 2026-10-05/06 runs shipped (onboarding, `/business/`, enquiry intake,
always-current versions), fix what is wrong, update the documents, release.

## Done

| Change | Where |
|---|---|
| Sources synced to the published releases (Switchboard 0.6.2, Observatory 0.17.3, launcher 0.1.29); `facts.md` rows re-verified (SHA256SUMS + gpg, receipts, `spctl`, LICENSE at tag) | PR #53, commit ab8a585 |
| `COMMERCIAL-LICENSE.md`, README: the organization template (form + commercial@) | PR #53 |
| Nightly drift job: Actions may not open pull requests here, so it keeps one issue and warns instead of failing | PR #53, `.github/workflows/releases.yml` |
| Enquiries: the Platform's email rule; referrer http(s) only; metadata cut, never refused; lone surrogates replaced; forward signed at send time; only 400/409/413/415/422 final; failure mails `LEAD_NOTIFY_TO`; idempotency without `source`; the page drops its id after 409 | PR #53, commit 9128bcb, `worker/leads.js`, `assets/business.js` |
| Releases: `hold` rolls back below the floor; a cron run where nothing answered stores nothing; `validSnapshot` never throws; JSON-LD escapes `<` | PR #53, `worker/releases.js`, `worker/index.js`, `worker/live.js` |
| SEO: `/privacy/` OG/Twitter/JSON-LD, `/switchboard/agents/` JSON-LD, `llms.txt` agent pages | PR #53 |
| `scripts/verify-live.py`: blanks the per-render form token on `/business/`, checks all seven download routes from `releases/current.json` | this change |

Checks run: `npm test` 66 pass (11 new; 5 fail on the code before the fix); `npm run check` all PASS;
CI `check` pass on PR #53.

## Production receipt

- Deployed from `main` 6de5bb0 with `npm run deploy` → Worker version `0e9faaa5-57f0-4e9b-a2d9-0a38f9cf6040`,
  2026-10-06 ~03:00 UTC. Credential: `passioncode-ai.github.io/prod/CLOUDFLARE_API_TOKEN`
  (Observatory door, preset `workers-edit`, issued 2026-10-06). The local wrangler OAuth login
  had been narrowed to `account:read` + `email_routing:write` and could no longer deploy or read D1.
- D1 (`CLOUDFLARE_D1_TOKEN`, preset `d1-edit`): `leads` held no rows — no enquiry was lost to the
  defects above.
- `python3 scripts/verify-live.py` → PASS: 43 assets, 7 download routes, 3 private-path
  exclusions ([live.json](../evidence/2026-10-06-review-fixes/live.json)).

## Open

- Closed 2026-10-06 10:30Z: the Worker has `GITHUB_TOKEN` (expires 2027-08-30; rotate before);
  first cron with it stored the snapshot with `errors` `[]`. The Actions schedule never fired in
  nine hours and is now the second path (docs/DEPLOYMENT.md#always-current-versions).
- Closed 2026-10-06: Actions may create pull requests (organization and this repository).
- Mail DNS, 2026-10-06 10:12Z: the apex SPF no longer authorises Namecheap's forwarding servers;
  it is `v=spf1 include:_spf.mx.cloudflare.net ~all` (MX, DKIM `cf2024-1`, DMARC `p=reject` and
  `cf-bounce` SPF were already right), checked on both Cloudflare nameservers, 1.1.1.1 and 8.8.8.8.

Later the same day (07:50–08:10 UTC): PR #55 (receipts over the cap wait) and PR #56 (Switchboard
0.6.5, published 03:14Z, synced into the sources with facts re-verified) deployed from `main`
`cab0251` → Worker `c5bd3094-e3e3-4be8-9bff-5423cad61f2c`; `verify-live.py` PASS, 43 assets,
7 download routes, 3 exclusions ([live.json](../evidence/2026-10-06-review-fixes/live.json)).

Closed after the deploy above: receipts over the hourly cap wait for the next cron try instead of
being dropped (PR "Receipts over the hourly cap wait").

Next task: rotate `GITHUB_TOKEN` before 2027-08-30.
