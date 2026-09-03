# Cloudflare cutover receipt — 2026-09-03

This is the production receipt for moving `passioncode.ai` from GitHub Pages to
Cloudflare Workers Static Assets. Times below are UTC.

## Artifact

- Repository production commit: `d5c168d1e1ed51070b5d56e9416e69efa5cbd4fd`.
- GitHub check run: `33742004262`, conclusion `success`.
- Cloudflare Worker: `passioncode-ai` in account
  `43da56547c0f538daaf7e94c6179faae`.
- Deployed Worker version: `c6841b99-951a-4519-ba8c-efbc8a63ddad`.

The following local gates passed immediately before deployment:

```text
PASS: brand lock holds 20 canonical files, 27 exports and 7 runtime aliases
PASS: 12 files, canonical copy, metadata, consistent CTA, responsive CSS, 1200×630 social card
PASS: Cloudflare Worker serves assets and redirects www to the canonical apex
PASS: built 11 public entries in dist/
```

## Routing

Cloudflare reported both Custom Domains enabled on the production Worker:

| Hostname | Custom Domain ID | Certificate ID |
|---|---|---|
| `passioncode.ai` | `5ddab09673c131626086b55d7a91f8993ff20f1c` | `c72574c4-483f-44c6-8678-5b0f21443909` |
| `www.passioncode.ai` | `23d519e482e098efc1cc55877fa3c0f2205c4eb0` | `ff9a8dae-aff8-48fa-9c77-bda7bd22212c` |

The zone now contains read-only, proxied Cloudflare Worker records at both hostnames.
The five MX records and the SPF TXT record retained their pre-cutover IDs. The former
GitHub Pages A/AAAA records and `www` CNAME are absent.

## Live checks

Observed at 2026-09-03 10:06 UTC:

```text
GET https://passioncode.ai/              → 200, server: cloudflare
GET https://www.passioncode.ai/path?q=1  → 301, location: https://passioncode.ai/path?q=1
GET https://passioncode.ai/assets/README.md → 404
```

The production HTML contained `Hosted product in active development`,
`The bottleneck moved up a level.` and two identical `Explore PassionCode on GitHub`
primary CTAs. The production browser check reported zero failed images and no horizontal
overflow at its 1280 px viewport.

GitHub does not allow deactivating Pages for an organization-site repository. Its custom
domain was detached through the Pages API instead; the final Pages state reported
`cname: null` and `html_url: https://passioncode-ai.github.io/`. The Cloudflare DNS zone
is therefore the only route for `passioncode.ai`.

Cloudflare Builds Git integration is not enabled: the repository-connection attempt
returned Cloudflare error `8000008` (project disconnected from Git). Production deploys
therefore use the authenticated Wrangler path documented in [`DEPLOYMENT.md`](DEPLOYMENT.md).
