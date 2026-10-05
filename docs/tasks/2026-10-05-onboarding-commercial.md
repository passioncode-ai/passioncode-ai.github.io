# Onboarding, commercial intake and always-current versions — 2026-10-05

Operator request 2026-10-05: homepage onboarding into the ecosystem (keep the header), three paths
(personal use / contribute / commercial), a /business/ page with a funnel form and savings
estimate, commercial@passioncode.ai, a DigitalOcean org backend, always-current versions, SEO,
animation; brand/icon/screenshot fixes across repositories.

## Done on this branch (`agent/onboarding-commercial-20261005`)
- `releases/products.json` (policy) + generated `releases/current.json`; `worker/releases.js`
  resolver (stable/prerelease channel, required assets with SHA-256 digests, hold, never downgrade);
  `worker/live.js` rewrites `data-live`, `data-live-href`, `data-live-ld` (edge HTMLRewriter and
  source); `npm run releases:sync` = `node scripts/sync-releases.mjs [--check]`. Tests:
  `node --test scripts/releases.test.mjs` → 12/12 pass.
- `worker/index.js`: live downloads for fabric/switchboard/inbox/dashboards/observatory,
  `/api/releases`, `/api/leads` intake (D1 first, signed form token, honeypot, rate limit, mail
  notification + receipt via `send_email`, HMAC forward to the Platform), cron every 15 min
  (release refresh + delivery retries + retention), security headers/CSP on HTML.
  `worker/leads.js`, `assets/lead-options.js`, `assets/estimate.js`, `migrations/0001_site.sql`.
  Tests: `node --test scripts/check-worker.mjs` → 18/18 pass (D1 via `scripts/d1-shim.mjs`).
- D1 `passioncode-site` created (WEUR, id in `wrangler.json`), migration applied remotely.
  Observatory proposal `prop:9558486c6c994211`.
- Narrow token `passioncode-ai.github.io/prod/CF_EMAIL_ROUTING_TOKEN` issued (zone passioncode.ai).

## Done since (same branch)
- Pages: new homepage (vision, how it works, paths, tools with live versions, for builders,
  company teaser, open source, FAQ), `/start/`, `/business/` (segments, estimate, engagement,
  options, five-step form, FAQ), `/business/thanks/` (noindex), `/privacy/`; footer on every page
  gains Get started, For companies, Privacy and the commercial address; header unchanged except a
  scrolled shadow and hover underline. `assets/site.js`, `assets/business.js`; styles appended.
- Product pages carry `data-live` markers (Switchboard through its renderer, Fabric, Inbox,
  Dashboards — now on `/dashboards/download/macos` and the 0.4.1 facts verified below —
  Observatory); Dashboards gains its synthetic screenshots from fabric-dashboards `8b23441`.
- `scripts/pages.mjs` is the one page list (checks, copy projections, build, sync);
  `scripts/check-site.mjs` rewritten: CSP-safe markup, live values equal the snapshot, form ↔
  Worker options parity, privacy facts, honest disclosures kept.
- Withdrawn-release bug found in local testing and fixed (a failed product keeps its last entry;
  an answering one is taken as answered); test added.
- SEO/AEO: canonical, Organization + WebSite + FAQPage (home), HowTo (/start/), Service + FAQPage
  (/business/), the 1200x630 social card, sitemap with the new pages, `llms.txt`.
- Nightly `.github/workflows/releases.yml` (21:00 UTC).

## Checks run (2026-10-05)
| Command | Result |
|---|---|
| `npm run check` | exit 0 — brand lock; 15 Switchboard + 12 release + 18 Worker tests; 11 pages; tokens; display copy; projections |
| `npm run releases:check` | PASS: pages and releases/current.json match the published releases |
| `npm run build` | PASS, allow-listed `dist/` |
| `wrangler dev --local` + `/__scheduled` | snapshot refreshed from GitHub (7 products, 0 failed); an injected 9.9.9 moved the text, the checksum, the JSON-LD and the download; the cron then restored 0.4.1 |
| local POST /api/leads with the served form token | 201; D1 row notify=done, confirm=done, forward=pending (waiting for the Platform) |
| Playwright + Chrome, 1440 and 390 px, five pages | no console errors, no horizontal overflow, no broken images; the funnel walked step by step, errors per step, estimate $2,150–$4,350 for 40 h × $50 manual |
| Dashboards v0.4.1 DMG | SHA-256 equal to the digest; `stapler validate` worked; `spctl` Notarized Developer ID; universal; macOS 13.0 |

## Open — exact next tasks
1. Deploy from reviewed main: secrets `FORM_TOKEN_SECRET`, `IP_HASH_SALT` (stdin), then
   `npm run deploy`; verify live and send one test enquiry.
2. Platform: deploy passioncode-platform when the DigitalOcean token is in the vault, then set
   `PLATFORM_URL` and `PLATFORM_INTAKE_SECRET` (PLAT-003).
3. SITE-015, SITE-016, SITE-017 in [backlog](../backlog.md).

## Human steps
- DigitalOcean team API token into `passioncode-platform/prod/DIGITALOCEAN_TOKEN`.
- Approve the apex SPF fix to `v=spf1 include:_spf.mx.cloudflare.net ~all`.
- Done by the operator 2026-10-05: mailbox commercial@passioncode.ai (routing rule → fabric-inbox, verified).
