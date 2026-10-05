# Onboarding, commercial intake and always-current versions — 2026-10-05 (in progress)

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

## Open — exact next tasks, in order
1. Write pages listed in `scripts/pages.mjs`: `start/`, `business/` (form fields = names in
   `worker/leads.js` `buildLead`, options = `assets/lead-options.js`, hidden `form_token` and
   honeypot `company_fax`), `business/thanks/`, `privacy/`; new homepage `<main>` (header kept);
   `assets/site.js` (reveal, header state) and `assets/business.js` (steps, live estimate, JSON
   submit, draft in localStorage); CSS appended to `styles.css`; mark version spans `data-live`.
   Design dials announced: VARIANCE 7 / MOTION 5 / DENSITY 4, own PassionCode tokens, reduced
   motion and no-JS fully static.
2. Update `scripts/check-site.mjs` (use `PAGES`, allow only `/assets/site.js` and
   `/assets/business.js`, options parity, data-live equals `releases/current.json`),
   `build-site.mjs` allow-list (+ releases files, new pages, js), `package.json` scripts
   (`releases:sync`, tests), sitemap, robots, `llms.txt`, docs (UX scenarios SCN-013+, facts,
   DEPLOYMENT sections `#always-current-versions`, `#commercial-enquiries`, `#storage`,
   `#security-headers`, HANDOFF, backlog under lease), nightly `releases:sync --check` workflow.
3. Secrets: `wrangler secret put FORM_TOKEN_SECRET`, `IP_HASH_SALT` (random, stdin); later
   `PLATFORM_INTAKE_SECRET` + var `PLATFORM_URL`. Deploy per docs/DEPLOYMENT.md, verify live.
4. Backend: `~/DATA/passioncode-platform` (local, built by a subagent; not pushed). Create private
   repo `passioncode-ai/passioncode-platform`, push, deploy to DigitalOcean after the operator puts
   the team token in vault slot `passioncode-platform/prod/DIGITALOCEAN_TOKEN`.
5. Cross-repo fixes from the 2026-10-05 audit (fabric README says private; stale org profile
   versions; Okolos off-brand icons; inbox `demo_app.png` shows a real third-party identity; no
   screenshots/social previews; CONTRIBUTING links) — send to owning sessions / PRs.
6. Knowledge base: roadmap tracks for the org backend and site onboarding; licensing commercial
   contact → /business/ form + commercial@ (templates in every repo).

## Human steps
- Fabric Inbox → New mailbox `commercial@passioncode.ai` (agent off); until then set
  `LEAD_NOTIFY_TO` to contact@passioncode.ai.
- DigitalOcean team API token into the vault slot above.
- Approve fixing apex SPF to `v=spf1 include:_spf.mx.cloudflare.net ~all` (stale Namecheap value).
