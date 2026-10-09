# PassionCode.ai deployment

## What is enforced

- `wrangler.json` binds the Worker to `passioncode.ai` and `www.passioncode.ai` as
  Custom Domains. The Worker redirects `www` to the canonical apex URL.
- `npm run check` validates the brand lock, the release and Worker unit tests, the 28 pages
  (`scripts/pages.mjs`: 14 English pages and the same 14 in each other [language](#languages)),
  the generated language versions, live values against `releases/current.json`, the form against
  the Worker's options, and scoped design-token contrast.
- `python3 scripts/extract-public-copy.py --check` verifies the 28 public copy projections in
  `docs/brand/copy/`; it is the last step of `npm run check`. After changing visible text, run
  `python3 scripts/extract-public-copy.py` to regenerate them.
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

`/switchboard/download/macos` and `/switchboard/download/windows` return 302 to the current release's assets in the release snapshot ([always-current versions](#always-current-versions)) — `switchboard/release.json` is its floor and the source of the release-bound page sections below — with `Cache-Control: no-store` and `X-Robots-Tag: noindex`. Query parameters cannot change the destination. The optional trailing slash is supported; unknown platform paths fall through to the asset 404. The Worker canonicalizes www before serving any route.

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

Before production, verify the pushed `main` SHA equals the reviewed local commit, rerun the local checks, then deploy. After deployment compare the 28 pages `scripts/pages.mjs` lists, the other allow-listed assets and
the seven download redirects (`/<product>/download/<platform>`, [always-current
versions](#always-current-versions)). `scripts/verify-live.py` checks every entry of the current build
(61 on 2026-10-08; the not-found page of each language through an address that cannot exist under
its prefix, expecting 404), each page's `<html lang>` and, on indexed pages, the hreflang list (every
language and x-default), redirect destination/no-store/noindex, and that private paths and the
not-found page's own addresses in every language answer 404:

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
  `hold` tag that freezes it — also below the bundled floor, so `hold` is how a bad release is
  rolled back on purpose (a release merely withdrawn on GitHub never takes a product below the
  floor; hold the previous tag instead). A release is eligible only when every required asset is attached
  with a SHA-256 digest at the repository's own release path; a half-uploaded release is never
  offered. npm products (launcher, adapter) take the registry's `latest`.
- **The Worker's cron with a token is the main path** (since 2026-10-06). `GITHUB_TOKEN` is a
  fine-grained token with *Public repositories (read-only)* and no permissions, owned by the
  operator's account; the organization refuses fine-grained tokens that live longer than 366 days,
  so it **expires 2027-08-30** and is rotated before then (`vault.py rotate passioncode-ai.github.io
  prod GITHUB_TOKEN`, then `wrangler secret put GITHUB_TOKEN` from stdin). Kept in Project
  Observatory (`passioncode-ai.github.io/prod/GITHUB_TOKEN`). First run with it: 2026-10-06
  10:30:41 UTC, every product answered (`errors` `[]`).
- **The hourly push is a second path.** GitHub runs scheduled workflows on a best-effort basis:
  in its first nine hours `releases-push.yml` never fired on schedule (only the manual run at
  01:52Z). `.github/workflows/releases-push.yml` (minute 7 of every hour) runs `scripts/push-releases.mjs`: it resolves every product with the job's own token —
  GitHub limits that token per repository, not per shared address — and sends the snapshot to
  `POST /api/releases/ingest`, signed `X-PC-Signature: v1=HMAC-SHA256(RELEASES_INGEST_SECRET,
  "<X-PC-Timestamp>.<body>")` within five minutes. The Worker validates it with the same rules as
  everything else (`validSnapshot`) and stores it in D1 with `source = 'push'`. The secret is
  kept in Project Observatory (`passioncode-ai.github.io/prod/RELEASES_INGEST_SECRET`) and set
  twice from stdin: `wrangler secret put RELEASES_INGEST_SECRET` and
  `gh secret set RELEASES_INGEST_SECRET -R passioncode-ai/passioncode-ai.github.io`.
- The Worker's own cron runs every 15 minutes (`*/15 * * * *`). Without a `GITHUB_TOKEN` it does not ask
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
  It also dispatches `check.yml` on that branch: a push or pull request made with the Actions token
  starts no workflow, so without the dispatch the pull request carried no check (measured
  2026-10-07, PR #63).
  Actions may open pull requests in the organization and in this repository since 2026-10-06
  (`can_approve_pull_request_reviews: true`, set by the operator's decision). Should that be
  refused again, the job keeps one open issue, "Release drift: sources behind the published
  releases", with the compare link, and ends with a warning instead of failing: the live site
  already serves the current versions.

Facts that are not versions — requirements, notarization, a feature a release adds — still change
by hand with the product page and `docs/brand/facts.md`; the live value never invents them. Until
the sync lands, a release-bound sentence (Switchboard's notarization note, its license region) may
describe the release in `switchboard/release.json` while the version beside it is already the
newer one: merge the nightly sync and re-check `facts.md` the day a release ships.

A cron run where no product answered (the anonymous `403` case) stores nothing: the snapshot and
its `fetched_at` stay as they were, and the log says `releases.refresh_failed`.

## Languages

Operator decision 2026-10-08 (roadmap RM-25, fabric-workspace `knowledge/localization.md`): every
page in English and in Russian, on a foundation that takes more languages from catalogs alone.

- **The registry** is `i18n/locales.json`: each language's code, own name (the switch's label),
  English name (what the commercial mailbox reads), Open Graph locale, BCP 47 tag (numbers, money,
  plural rules) and the switch's accessible name. `scripts/pages.mjs`, the Worker, the page scripts,
  the Python helpers and `verify-live.py` read it; nothing else lists languages.
- **English is the source.** English pages are written by hand at `/`; every other language has the
  same pages under `/<code>/`, **generated** by `npm run locales` (`scripts/build-locale.mjs`) from the
  English page and the catalogs `i18n/<code>/*.json`, keyed by the English text (L10N-02):
  `_common.json` (header, footer, names), one file per page (`home.json`, `business.json`, …;
  Switchboard's release regions in `switchboard-release.json`), `_scripts.json` (what
  `assets/messages.js` and `worker/messages.js` say), `_checks.json` (the gate's banned phrases and
  disclosures in that language). Never edit a generated page; edit the English page or the catalog.
- **What the generator writes**: each translated page (markup unchanged, text, translatable
  attributes, meta and JSON-LD prose translated, page links moved under `/<code>/`, the form's action
  `/api/leads?lang=<code>`); the chrome of every page, English included — `<html lang>`, the canonical
  in its own language, reciprocal `hreflang` for every language plus `x-default` (English), `og:locale`
  and `og:locale:alternate`, and the header's language switch to the same page in the other language
  (one link for two languages, a `<details>` menu for three or more); `assets/i18n.js` and
  `worker/i18n.js`; `sitemap.xml` with every version of every indexed page and its alternates; the
  "Languages" section of `llms.txt`. The thanks and 404 pages stay `noindex` in every language and carry
  no alternates; every other page is indexed in every language.
- **The gate** (`npm run locales -- --check`, inside `npm run check`) fails on an English fragment or
  message with no translation (a changed English sentence is a new key, so it is reported until
  translated), an unused catalog entry, a translation that carries markup or changes its `{placeholders}`,
  a plural without every form the language's `Intl.PluralRules` needs (L10N-03), a generated file out of
  date, or a translated page whose skeleton differs from its English page — every element, id, class,
  `data-live` hook, link (compared in English) and form field name in order. Switchboard's release
  regions are translated in every variant a release can produce (MIT/PolyForm/AGPL, notarized or not,
  checksums, launcher plugin), so a release never meets an untranslated region.
- **Releases.** `npm run releases:sync` and `scripts/update-switchboard-release.mjs` regenerate every
  language after the English pages move; the updater restores the English page and manifest if a
  language cannot follow. The Worker's live rewriter (`worker/live.js`) runs on every language's pages;
  `data-live` text, codes and versions are never translated, so the same hooks carry the same values
  (`scripts/locales.test.mjs`, `scripts/check-worker.mjs`).
- **The Worker** serves an unknown address under `/<code>/` with that language's `404.html` (status
  404), writes a fresh form token into `/<code>/business/`, records the form's language on the lead
  (`source.locale`, `source.page`), answers refusals (page and JSON `message`, validation issues) in it
  — `error` codes stay English — and sends the receipt email in it, with links to that language's
  pages. The notification to the commercial mailbox stays English and names the language to reply in.

- **Chinese and Japanese** (2026-10-10): `zh-Hans` (Simplified Chinese, `/zh-Hans/`) and `ja`
  (`/ja/`). The registry code is the URL prefix, `<html lang>` and the hreflang value alike, so the
  Chinese code is the script tag `zh-Hans` rather than `zh-CN`: it names what the text is (Simplified)
  and not a country, and it makes the browser pick Simplified glyphs. Both have one plural form
  (`other`). `tightenCjk` (`scripts/locales.mjs`) drops the English space around links between CJK
  characters; `"latinSpacing": false` (Japanese) also drops it beside Latin names. `styles.css` ends
  with the CJK block: system CJK font stacks, no negative tracking, taller headings.

### Adding a language

1. Add its entry to `i18n/locales.json` (e.g. `"de": { "name": "Deutsch", "englishName": "German",
   "og": "de_DE", "intl": "de-DE", "switchLabel": "Sprache" }`).
2. `npm run locales -- --missing` prints every fragment and message to translate, file by file, as
   catalog JSON; save each block as `i18n/<code>/<file>.json` and fill the values (product names stay
   English; the glossary in fabric-workspace `knowledge/localization.md` and `docs/brand/` apply). A
   plural gets one form per category the language has (German: `one`, `other`).
3. Write `i18n/<code>/_checks.json` (copy the Russian one): banned phrases in the language and, for each
   product page, the disclosures it must keep, in its own words.
4. `npm run locales`, `python3 scripts/extract-public-copy.py`, `npm run check`, `npm run build`, PR,
   deploy, `verify-live.py`. Nothing else changes: routes, the Worker, the sitemap, hreflang, the switch
   (it becomes a menu at three languages) and `llms.txt` follow the registry. The test "adding a
   language takes only i18n/locales.json and i18n/<locale>/" in `scripts/locales.test.mjs` proves this
   on a copy of the site on every check.

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
   30 across all senders an hour — a receipt over the hourly cap waits until the top of the next
   hour without spending an attempt, and is dropped (`skipped`) only after 24 hours over the cap;
3. a copy to the PassionCode.ai Platform (`PLATFORM_URL` + `/v1/leads`), signed
   `X-PC-Signature: v1=HMAC-SHA256(PLATFORM_INTAKE_SECRET, "<X-PC-Timestamp>.<body>")` with the
   time of sending (the Platform accepts ±300 s). Until both are set, leads wait in D1 and are
   forwarded once they are. Only `400`, `409`, `413`, `415` and `422` end a forward at once; any
   other answer (a `401` during a secret rotation, a `404` while a route deploys, `5xx`) is retried.

The Worker accepts only what the Platform's `lead/1` schema accepts: the email rule is the
Platform's own (zod `z.regexes.email`), the referrer is kept only as an http(s) address, and what
the visitor never typed (referrer, UTM values, user agent) is cut to size instead of failing the
request. The request id does not cover the referrer, so a resend through another link is the same
request; on a `409` the page drops its id, so the next send is a new request.

A delivery that ends as `failed` — at once, or after the last attempt — mails `LEAD_NOTIFY_TO`
(subject "Enquiry delivery failed") and logs `leads.failed`; a failed notification is only logged.
To re-queue a lead once the cause is fixed:

```sh
python3 "$(project-observatory full-path)/tools/use_secret.py" run --env prod \
  passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npx wrangler d1 execute passioncode-site --remote \
  --command "UPDATE leads SET forward_status = 'pending', forward_attempts = 0, next_attempt_at = datetime('now') WHERE id = '<lead id>'"
```

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
Structured log events (`leads.received`, `leads.delivered`, `leads.retried`, `leads.failed`,
`releases.refreshed`, `releases.refresh_failed`, `releases.product_failed`) are in Workers Logs (`observability.enabled`); none carries personal data.

## Security headers

Every response — pages, assets, API answers and refusals (since 2026-10-07) — carries
`Strict-Transport-Security: max-age=63072000; includeSubDomains` (two years; `api.` and `wiki.`
answer over HTTPS; no preload commitment), `Content-Security-Policy` (`default-src 'self'`; no
inline script or style — `scripts/check-site.mjs` refuses inline `style=`, event handlers and
executable inline scripts), `X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, `Permissions-Policy` and `X-Frame-Options: DENY`. Plain-text
assets (`llms.txt`, `robots.txt`) are served as `text/plain; charset=utf-8`.

**One encrypted origin.** Any `http://` request and any `www.` request is answered `301` to
`https://passioncode.ai` with the path and query kept, in one hop — the /business/ form never
posts personal data in cleartext (audit 2026-10-07: the site answered plain HTTP with `200`).

**Unknown addresses** get `404.html` (noindex, the site's header and footer, links to the home
page, /start/ and /business/) with status 404, through `assets.not_found_handling: "404-page"`.
Its own addresses (`/404`, `/404/`, `/404.html`) answer the same way: the Worker asks the assets for a
path that cannot exist (`MISSING_PATH` in `worker/index.js`), because the assets would otherwise
serve the file as an ordinary page with `200` (measured 2026-10-07: `/404` → 200, `/404.html` → 307).

## Authenticated connector fallback

On 2026-09-26 Wrangler had no usable Workers credential in its environment. The existing authenticated Cloudflare connector could access the same account/Worker. The checked commit was bundled with `npx wrangler deploy --dry-run --outdir /tmp/passioncode-worker-527b5ba`, then deployed through the documented [direct asset upload API](https://developers.cloudflare.com/workers/static-assets/direct-upload/).

The manifest included only the 17 files in the checked `dist` allowlist, using the documented SHA-256(base64 bytes + extension) prefix hash. The connector created an assets-upload-session for `passioncode-ai`; its short-lived JWT uploaded the requested multipart/base64 buckets. The completion JWT accompanied the bundled module and source map in the Worker PUT. Metadata retained `ASSETS`, compatibility date/flags, usage model and routing settings from the existing Worker; no DNS or account permissions changed. Tokens stayed local/transient and are excluded from receipts/Git.

The upload created the production deployment directly. [Launch receipt](LAUNCH_RECEIPT.json) records its version/deployment IDs and curl observations. A Python urllib probe returned 403; curl and the normal browser returned the new pages. This fallback needs the connector's existing Workers authorization, not a Pages-only token or token-issuance credential.
