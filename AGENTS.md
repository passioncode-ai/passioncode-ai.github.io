# passioncode-ai.github.io — working in this repository

## Role

This repository is passioncode.ai, the public home and product pages: Fabric and its tools
(Fabric Switchboard, Fabric Inbox, Fabric Dashboards), Project Observatory and the design system. It owns the public product descriptions, the download routing
and the shared web design reference. It does not own native release acceptance
(`docs/DOCMAP.md`).

## Build and test

These come from `README.md` ("Preview and checks") and `docs/DOCMAP.md` ("Checks"):

```sh
npm ci
npm run check                               # brand lock, site structure, Worker contract, design tokens
npm run build                               # the allow-listed deploy artifact
python3 scripts/extract-public-copy.py --check
npm run preview -- --port 4173              # Worker preview; exercises the download redirects
```

`.github/workflows/check.yml` runs `npm ci`, `npm run check` and `npm run build` on pull requests
and on pushes to `main`. It holds no Cloudflare credential and does not deploy. Production deploys
go from reviewed `main` with `npm run deploy` through authenticated Wrangler
([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).

## Where things live

- [docs/HANDOFF.md](docs/HANDOFF.md) is the current handoff: source owners, checks, publication
  and the next work. [docs/DOCMAP.md](docs/DOCMAP.md) says what each change obliges you to update.
- Visitor paths are in [docs/ux/](docs/ux/). The brand is locked in [brand/](brand/README.md), and
  `npm run check` verifies its bytes. The shared tokens are in [design-system/](design-system/README.md).
- [switchboard/release.json](switchboard/release.json) selects the public Switchboard release that
  the download redirects serve.
- The Worker is `worker/`, configured by `wrangler.json`. The pages are `index.html` and one
  directory per product.
- Launch receipts in `docs/` (`*_RECEIPT.*`) describe their own release and are never rewritten.

## Rules in this repository

- This repository is public. Nothing private may be added. Never link visitors to private source:
  `scripts/check-site.mjs` asserts this for Fabric and Inbox.
- The deploy artifact is an allow-list, not the repository root. Documentation and repository
  metadata stay out of the public asset namespace (`docs/DEPLOYMENT.md`).
- Deploy only from reviewed `main` (`README.md`).
- A content or navigation change also updates the brand facts, the UX scenarios, flows and screens,
  the sitemap and the build allow-list where routes change, and the handoff (`docs/DOCMAP.md`,
  "Propagation").

## Organisation

This repository is one of the `passioncode-ai` repositories. **The org map, the shared
rules and onboarding live in [passioncode-ai/org-index](https://github.com/passioncode-ai/org-index)**
(private; readable by every org member):

- [README](https://github.com/passioncode-ai/org-index#repositories): which repository owns what, and how they connect
- [RULES.md](https://github.com/passioncode-ai/org-index/blob/main/RULES.md): branches, commits, CI, leases, secrets, handoffs
- [ONBOARDING.md](https://github.com/passioncode-ai/org-index/blob/main/ONBOARDING.md): setting up a new contributor's machine

Where this file is stricter than RULES.md, this file wins. A change to this repository's
role, dependencies or test command updates its row in `org-index/repositories.json` in the same change.
