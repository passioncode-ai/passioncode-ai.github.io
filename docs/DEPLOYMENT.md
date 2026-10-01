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
CLOUDFLARE_ACCOUNT_ID=<organization account id> npm run deploy
```

`wrangler.json` carries no account id: the public tree keeps account ids out (org-index
`check_private.py` rule P4), so the deploy takes it from `CLOUDFLARE_ACCOUNT_ID` and `npm run
deploy` refuses to start without it — a login that sees several accounts must not pick one. On the
operator's machine the id is a named slot in Project Observatory:
`tools/use_secret.py run --env prod passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npm run deploy`
(run from the Observatory checkout with `--` followed by a command that `cd`s into this clone, or
export the variable first); a contributor gets it from the operator.

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
- re-renders only the release-bound parts of `switchboard/index.html` through `scripts/switchboard-release.mjs`: `data-release-*` elements, the `<!-- release:NAME -->` regions (`macos-note`, `checksums`, `license-current`, `agents` — the agent section appears from 0.4.0-beta.1) and the JSON-LD `softwareVersion`/`license` (MIT up to and including 0.3.1-beta.1, PolyForm after). The MIT-history sentence is never rewritten; `npm run check` fails if it stops naming v0.3.1-beta.1 or if the page differs from what the manifest renders (planted-defect tests: `npm test`).

Review the release's actual signing/platform limits and installation instructions before committing, and update the Switchboard rows in `docs/brand/facts.md` and `python3 scripts/extract-public-copy.py`. Never advertise GitHub `releases/latest` as the newest beta: that endpoint excludes prereleases.

Before production, verify the pushed `main` SHA equals the reviewed local commit, rerun the local checks, then deploy. After deployment verify all five pages, both redirect destinations, anonymous archive hashes, and www canonicalization. Keep the Worker deployment ID and commit in the handoff receipt. No full hosted suite is dispatched for this update.

## Fabric and Fabric Inbox downloads

`/fabric/download/macos` and `/inbox/download/macos` behave like the Switchboard routes: a 302 to the fixed URL in `fabric/release.json` or `inbox/release.json`, `Cache-Control: no-store`, `X-Robots-Tag: noindex`, queries ignored, other paths fall through to the asset 404 (`scripts/check-worker.mjs`). To select a newer build, edit the manifest by hand from the release itself — tag, DMG URL, and the SHA-256 from the release's `.sha256` asset (Inbox) or release notes (Fabric), checked against GitHub's asset digest (`gh release view <tag> -R <repo> --json assets`) — then update the version, checksum and limits on the page and the rows in `docs/brand/facts.md`; `npm run check` fails when the page and the manifest disagree.

## Authenticated connector fallback

On 2026-09-26 Wrangler had no usable Workers credential in its environment. The existing authenticated Cloudflare connector could access the same account/Worker. The checked commit was bundled with `npx wrangler deploy --dry-run --outdir /tmp/passioncode-worker-527b5ba`, then deployed through the documented [direct asset upload API](https://developers.cloudflare.com/workers/static-assets/direct-upload/).

The manifest included only the 17 files in the checked `dist` allowlist, using the documented SHA-256(base64 bytes + extension) prefix hash. The connector created an assets-upload-session for `passioncode-ai`; its short-lived JWT uploaded the requested multipart/base64 buckets. The completion JWT accompanied the bundled module and source map in the Worker PUT. Metadata retained `ASSETS`, compatibility date/flags, usage model and routing settings from the existing Worker; no DNS or account permissions changed. Tokens stayed local/transient and are excluded from receipts/Git.

The upload created the production deployment directly. [Launch receipt](LAUNCH_RECEIPT.json) records its version/deployment IDs and curl observations. A Python urllib probe returned 403; curl and the normal browser returned the new pages. This fallback needs the connector's existing Workers authorization, not a Pages-only token or token-issuance credential.
