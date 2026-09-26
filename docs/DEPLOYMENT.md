# PassionCode.ai deployment

## What is enforced

- `wrangler.json` binds the Worker to `passioncode.ai` and `www.passioncode.ai` as
  Custom Domains. The Worker redirects `www` to the canonical apex URL.
- `npm run check` validates the brand lock, public copy, static structure and deployment
  contract before a build can ship.
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
npm run build
npm run deploy
```

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

Replace the example tag with the actual tag. The updater rejects drafts and requires both nonempty archives to be anonymously downloadable. Review the release's actual signing/platform limits and installation instructions before committing. Never advertise GitHub `releases/latest` as the newest beta: that endpoint excludes prereleases.

Before production, verify the pushed `main` SHA equals the reviewed local commit, rerun the local checks, then deploy. After deployment verify all three pages, both redirect destinations, anonymous archive hashes, and www canonicalization. Keep the Worker deployment ID and commit in the handoff receipt. No full hosted suite is dispatched for this update.
