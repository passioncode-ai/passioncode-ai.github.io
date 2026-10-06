# PassionCode.ai deployment

## What is enforced

- `wrangler.json` binds the Worker to `passioncode.ai` and `www.passioncode.ai` as
  Custom Domains. The Worker redirects `www` to the canonical apex URL.
- `npm run check` validates the brand lock, the release and Worker unit tests, the eleven pages
  (`scripts/pages.mjs`), live values against `releases/current.json`, the form against the Worker's
  options, and scoped design-token contrast.
- `python3 scripts/extract-public-copy.py --check` verifies all seven copy projections;
  run it separately before committing/deploying. It is not part of `npm run check`.
- `.github/workflows/check.yml` repeats the checks on pushes and pull requests. It does
  not hold a Cloudflare credential or deploy independently.

Cloudflare's GitHub connection is not granted to this organization, so production
deploys currently run through the authenticated Wrangler path below. Connecting the
repository in **Workers & Pages → passioncode-ai → Settings → Builds** can add automatic
deploys later without storing a long-lived Cloudflare token in GitHub.

## Build and deploy

The deploy artifact is an allow-list, not the repository root. This keeps documentation,
brand source files and repository metadata out of the public asset namespace.

```bash
npm ci
npm run check
python3 scripts/extract-public-copy.py --check
npm run build
CLOUDFLARE_ACCOUNT_ID=<organization account id> npm run deploy
```

`wrangler.json` carries no account id: the public tree keeps account ids out (org-index
`check_private.py` rule P4), so the deploy takes it from `CLOUDFLARE_ACCOUNT_ID` and `npm run
deploy` refuses to start without it — a login that sees several accounts must not pick one. On the
operator's machine the id is a named slot in Project Observatory:
```sh
# Run from this website checkout. The installed Observatory locates its engine.
python3 "$(project-observatory full-path)/tools/use_secret.py" run --env prod \
  passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npm run deploy
```

The source-checkout equivalent is `observatory/engine/tools/use_secret.py` in
Project Observatory. `where --env prod passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID`
reports the slot without its value. This was checked on 2026-10-01; the runner resolved
the named production vault slot and a child confirmed the variable was present.
Wrangler still needs its existing authenticated login/API token; a resolved account
id alone is not proof of deployment permission. A contributor gets access from the operator.

## DNS and certificates

Cloudflare Custom Domains own the apex and `www` DNS records and issue their certificates.
Mail records are unrelated to the Worker and must remain untouched. The old GitHub Pages
`A`, `AAAA` and `www` CNAME records were removed during the cutover; `CNAME` and the Pages
deployment workflow are intentionally absent from this repository.

Sources checked 2026-09-03:
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/),
[Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/),
[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

## Verification

```bash
dig +short passioncode.ai
dig +short www.passioncode.ai
curl -I https://passioncode.ai/
curl -I https://www.passioncode.ai/
```

The expected result is HTTPS `200` from Cloudflare for the apex and a `301` from `www`
to the same path on `https://passioncode.ai`.

The completed production migration, including record IDs, Worker version and observed
responses, is recorded in [`CUTOVER_RECEIPT.md`](CUTOVER_RECEIPT.md).

## Switchboard downloads

`/switchboard/download/macos` and `/switchboard/download/windows` return 302 to the fixed URLs in `switchboard/release.json`, with `Cache-Control: no-store` and `X-Robots-Tag: noindex`. Query parameters cannot change the destination. The optional trailing slash is supported; unknown platform paths fall through to the asset 404. The Worker canonicalizes www before serving any route.

To select a new published beta or stable release:

```sh
node scripts/update-switchboard-release.mjs vX.Y.Z-beta.N
npm run check
npm run build
```

Replace the example tag with the actual tag. The updater rejects drafts and requires both nonempty archives to be anonymously downloadable. It also:

- takes each archive's SHA-256 from the release's `SHA256SUMS-<X.Y.Z>.txt` (or `SHA256SUMS-<version>.txt`) and refuses a value that differs from GitHub's own asset digest; without a sums file the page shows no checksums;
- sets `macosNotarized` only when `Fabric-Switchboard-<X.Y.Z>-macos-universal-receipt.json` says `notarization.status: Accepted`, `gatekeeper_accepted: true` and names the same archive SHA-256; otherwise the page keeps the not-notarized note;
- sets `launcherPlugin` only when `passioncode-ai/passioncode` `family.json` lists `passioncode-ai/fabric-switchboard`;
- re-renders only the release-bound parts of `switchboard/index.html` through `scripts/switchboard-release.mjs`: `data-release-*` elements, the `<!-- release:NAME -->` regions (`macos-note`, `checksums`, `license-current`, `agents` — the agent section appears from 0.4.0-beta.1) and the JSON-LD `softwareVersion`/`license` (MIT up to and including 0.3.1-beta.1, PolyForm for 0.4.0-beta.1, AGPL from 0.4.1-beta.1). The MIT-history sentence is never rewritten; `npm run check` fails if it stops naming v0.3.1-beta.1 or if the page differs from what the manifest renders (planted-defect tests: `npm test`).

Review the release's actual signing/platform limits and installation instructions before committing, and update the Switchboard rows in `docs/brand/facts.md` and `python3 scripts/extract-public-copy.py`. Never advertise GitHub `releases/latest` as the newest beta: that endpoint excludes prereleases.

Before production, verify the pushed `main` SHA equals the reviewed local commit, rerun the local checks, then deploy. After deployment compare all seven pages (home, Switchboard, Fabric, Inbox,
Observatory, Dashboards and design system), the other allow-listed assets and all
four download redirects. `scripts/verify-live.py` checks the current build's 30
entries, redirect destination/no-store/noindex and private-path exclusions:

```sh
python3 scripts/verify-live.py --output docs/evidence/2026-10-01-workplace/live.json
```

It maps `index.html` to its canonical trailing-slash route because Cloudflare
redirects explicit index filenames. For a newly selected artifact, also verify
anonymous download and archive SHA-256 against the selected release receipt.
Check www canonicalization separately and verify the historical Observatory
`#start` fragment lands at `/observatory/#start`, an alias for the setup section. Keep the Worker deployment ID and commit in the handoff receipt. No full hosted suite is dispatched for this update.

## Always-current versions

Operator decision 2026-10-05 (roadmap RM-15): the site names and serves the current release of
every product without a redeploy. One resolver (`worker/releases.js`) serves both paths:

- `releases/products.json` is the policy, edited by hand: each product's repository, channel
  (`stable` takes the newest non-prerelease, or the newest prerelease while none exists;
  `prerelease` takes the newest of either), the assets a release must carry, and an optional
  `hold` tag that freezes it. A release is eligible only when every required asset is attached
  with a SHA-256 digest at the repository's own release path; a half-uploaded release is never
  offered. npm products (launcher, adapter) take the registry's `latest`.
- **The hourly push is the main path.** `.github/workflows/releases-push.yml` (minute 7 of every
  hour) runs `scripts/push-releases.mjs`: it resolves every product with the job's own token —
  GitHub limits that token per repository, not per shared address — and sends the snapshot to
  `POST /api/releases/ingest`, signed `X-PC-Signature: v1=HMAC-SHA256(RELEASES_INGEST_SECRET,
  "<X-PC-Timestamp>.<body>")` within five minutes. The Worker validates it with the same rules as
  everything else (`validSnapshot`) and stores it in D1 with `source = 'push'`. The secret is
  kept in Project Observatory (`passioncode-ai.github.io/prod/RELEASES_INGEST_SECRET`) and set
  twice from stdin: `wrangler secret put RELEASES_INGEST_SECRET` and
  `gh secret set RELEASES_INGEST_SECRET -R passioncode-ai/passioncode-ai.github.io`.
- The Worker's own cron (`*/15 * * * *`) is the fallback. Without a `GITHUB_TOKEN` it does not ask
  GitHub while a pushed snapshot is younger than two hours: its shared egress addresses hit the
  anonymous limit (2026-10-05 16:00 UTC: `403` for every product). With a `GITHUB_TOKEN` secret
  (fine-grained, *Public repositories (read-only)*) it asks every run. Either way it uses ETags.
- In both paths a product that is missing or failed keeps its last good entry; one that answered
  is taken as answered, so a release withdrawn on GitHub leaves the site too. Nothing ever goes
  below `releases/current.json`, the snapshot bundled at build. D1 `release_snapshot` holds
  `fetched_at`, `source` and the per-product `errors`; the log events are `releases.pushed`,
  `releases.refreshed`, `releases.refresh_skipped` and `releases.product_failed`.
- Every HTML response passes through `worker/live.js`: an element with `data-live="<product>.<field>"`
  gets that value as text, `data-live-href` sets an `href`, and a `<script type="application/ld+json"
  data-live-ld="<product>">` gets `softwareVersion`. Crawlers and visitors without JavaScript see
  the same values.
- `/<product>/download/<platform>` (fabric, switchboard, inbox, dashboards, observatory; `macos`,
  `windows`, `wheel` where the policy names them) answers 302 to that release's asset with
  `Cache-Control: no-store` and `X-Robots-Tag: noindex`. Unknown paths fall through to the asset 404.
- `/api/releases` returns the snapshot as JSON (`Access-Control-Allow-Origin: *`, cached 60 s), for
  agents and other sites.
- `npm run releases:sync` writes the same values into the sources (`releases/current.json`, every
  `data-live` element, the legacy `fabric/` and `inbox/release.json`) and, when Switchboard moved,
  runs `scripts/update-switchboard-release.mjs` so its release-bound sections follow.
  `npm run releases:check` changes nothing and fails on drift; `.github/workflows/releases.yml`
  runs it nightly, pushes the sync to `automation/release-sync` and opens a pull request from it.
  The organization does not let Actions open pull requests (measured 2026-10-06), so when
  `gh pr create` is refused the job keeps one open issue, "Release drift: sources behind the
  published releases", with the compare link, and ends with a warning instead of failing: the live
  site already serves the current versions. A person opens the pull request from that link; allowing
  Actions to create pull requests (organization → Actions → General → Workflow permissions) removes
  this step.

Facts that are not versions — requirements, notarization, a feature a release adds — still change
by hand with the product page and `docs/brand/facts.md`; the live value never invents them.

## Storage

D1 database `passioncode-site` (binding `DB`, region WEUR, id in `wrangler.json`), migrations in
`migrations/`. Apply a new migration before deploying the code that needs it:

```sh
python3 "$(project-observatory full-path)/tools/use_secret.py" run --env prod \
  passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npx wrangler d1 migrations apply passioncode-site --remote
```

Tables: `release_snapshot` (one row), `release_cache` (GitHub ETags and bodies), `leads`,
`form_tokens` (spent nonces, pruned after two days).

## Commercial enquiries

`POST /api/leads` takes the /business/ form as JSON (scripted) or form-encoded (no JavaScript).
In order: same-origin check; the `LEAD_LIMITER` rate limit (5 a minute per address); a 32 KB cap
counted in bytes as the body streams; only the form's own field names are read (`FORM_FIELDS`,
null-prototype objects — a crafted `__proto__.x` name reaches nothing); the hidden `pc_hp` trap
(answered as accepted, stored nowhere, logged as `leads.honeypot`); the signed `form_token` the
Worker writes into `/business/` on every render, with a random nonce (refused when sent within
3 s or after 24 h, and spent once — a resend of the same request id is recognised as a duplicate
before the token is spent); validation against `assets/lead-options.js` (`worker/leads.js`
`buildLead`; control characters are removed and single-line fields lose line breaks; the savings
estimate is recomputed with `assets/estimate.js`, never taken from the client). The browser sends
one request id per draft, so a resend after a lost answer is the same lead. Then the lead is **written
to D1 before anything is sent**, and three deliveries run, each retried by the cron with backoff
(the cron's first look is 2 minutes after the request, then 2, 4, 8 … minutes, at most 6 hours
apart, 12 attempts, then marked failed; the Platform call times out after 10 s):

1. a notification to `LEAD_NOTIFY_TO` through the `send_email` binding, reply-to the sender;
2. a receipt to the sender that repeats nothing they typed, at most one per address a day and
   30 across all senders an hour;
3. a copy to the PassionCode.ai Platform (`PLATFORM_URL` + `/v1/leads`), signed
   `X-PC-Signature: v1=HMAC-SHA256(PLATFORM_INTAKE_SECRET, "<X-PC-Timestamp>.<body>")`. Until both
   are set, leads wait in D1 and are forwarded once they are.

Retention: a forwarded lead leaves D1 after 30 days; nothing stays longer than 24 months
(`/privacy/`). Secrets, set once with values on stdin (never in a file in the repository):

```sh
openssl rand -hex 32 | npx wrangler secret put FORM_TOKEN_SECRET
openssl rand -hex 32 | npx wrangler secret put IP_HASH_SALT
# when the Platform is deployed (passioncode-platform docs/runbooks/deploy.md):
<secret on stdin> | npx wrangler secret put PLATFORM_INTAKE_SECRET   # and vars.PLATFORM_URL
```

Each runs under `use_secret.py run … CLOUDFLARE_ACCOUNT_ID --` like the deploy. Without
`FORM_TOKEN_SECRET` or `IP_HASH_SALT` the endpoint answers 503 and names the email address.
Structured log events (`leads.received`, `leads.delivered`, `leads.retried`, `releases.refreshed`,
`releases.product_failed`) are in Workers Logs (`observability.enabled`); none carries personal data.

## Security headers

Every HTML response carries `Content-Security-Policy` (`default-src 'self'`; no inline script or
style — `scripts/check-site.mjs` refuses inline `style=`, event handlers and executable inline
scripts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` and `X-Frame-Options: DENY`.

## Authenticated connector fallback

On 2026-09-26 Wrangler had no usable Workers credential in its environment. The existing authenticated Cloudflare connector could access the same account/Worker. The checked commit was bundled with `npx wrangler deploy --dry-run --outdir /tmp/passioncode-worker-527b5ba`, then deployed through the documented [direct asset upload API](https://developers.cloudflare.com/workers/static-assets/direct-upload/).

The manifest included only the 17 files in the checked `dist` allowlist, using the documented SHA-256(base64 bytes + extension) prefix hash. The connector created an assets-upload-session for `passioncode-ai`; its short-lived JWT uploaded the requested multipart/base64 buckets. The completion JWT accompanied the bundled module and source map in the Worker PUT. Metadata retained `ASSETS`, compatibility date/flags, usage model and routing settings from the existing Worker; no DNS or account permissions changed. Tokens stayed local/transient and are excluded from receipts/Git.

The upload created the production deployment directly. [Launch receipt](LAUNCH_RECEIPT.json) records its version/deployment IDs and curl observations. A Python urllib probe returned 403; curl and the normal browser returned the new pages. This fallback needs the connector's existing Workers authorization, not a Pages-only token or token-issuance credential.
