# Working in passioncode-ai.github.io

## Read first

1. The PassionCode.ai knowledge base — `fabric-workspace/knowledge/` in your clone (org-index
   `scripts/clone_all.sh` makes it) or https://wiki.passioncode.ai/knowledge — at least its
   [README](https://github.com/passioncode-ai/fabric-workspace/blob/main/knowledge/README.md),
   vision, principles and how-to-work.
2. This file, then the organization's
   [CONTRIBUTING.md](https://github.com/passioncode-ai/.github/blob/main/CONTRIBUTING.md). This file
   adds the rules of this repository and wins where the two differ.

## What this repository is

passioncode.ai: the public home and product pages of PassionCode.ai — Fabric and its tools (Fabric
Switchboard, Fabric Inbox, Fabric Dashboards), Project Observatory and the design system. It owns
the public product descriptions, the download routing and the shared web design reference. It does
not own native release acceptance (`docs/DOCMAP.md`).

## Commands

These come from `README.md` ("Preview and checks") and `docs/DOCMAP.md` ("Checks"):

| What | Command |
|---|---|
| Install | `npm ci` |
| Test (the gate) | `npm run check` — brand lock, site structure and license wording, Worker contract, design tokens; then `python3 scripts/extract-public-copy.py --check` |
| Build | `npm run build` — the allow-listed deploy artifact in `dist/` |
| Preview | `npm run preview -- --port 4173` — the Worker, including the download redirects |
| MCP (register + proving call) | none: the site neither serves nor calls MCP (knowledge base `products.md`) |

`.github/workflows/check.yml` runs `npm ci`, `npm run check` and `npm run build` on pull requests
and on pushes to `main`. It holds no Cloudflare credential and does not deploy. Production deploys
go from reviewed `main` with `npm run deploy` through authenticated Wrangler
([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)); a merge alone deploys nothing.

## Where things live

- [docs/HANDOFF.md](docs/HANDOFF.md) is the current handoff: source owners, checks, publication
  and the next work. [docs/DOCMAP.md](docs/DOCMAP.md) says what each change obliges you to update.
- Visitor paths are in [docs/ux/](docs/ux/). The brand is locked in [brand/](brand/README.md), and
  `npm run check` verifies its bytes. The shared tokens are in [design-system/](design-system/README.md).
  The copy's voice, terms and facts are in [docs/brand/](docs/brand/README.md).
- [switchboard/release.json](switchboard/release.json) selects the public Switchboard release that
  the download redirects serve.
- The Worker is `worker/`, configured by `wrangler.json`. The pages are `index.html` and one
  directory per product.
- Launch receipts in `docs/` (`*_RECEIPT.*`) describe their own release and are never rewritten.

## Local rules

- This repository is public. Nothing private may be added. Never link visitors to private source:
  `scripts/check-site.mjs` asserts this for Fabric and Inbox.
- License wording follows Fabric ADR-0092 and the knowledge base
  [licensing](https://github.com/passioncode-ai/fabric-workspace/blob/main/knowledge/licensing.md):
  a product whose source is public is "open source under AGPL-3.0" with a commercial license
  available; Fabric and Fabric Inbox, whose source is private, are never called open source or
  AGPL; MIT and PolyForm name only released versions, inside `<!-- license-history -->` regions.
  `scripts/check-site.mjs` enforces all three.
- The deploy artifact is an allow-list, not the repository root. Documentation and repository
  metadata stay out of the public asset namespace (`docs/DEPLOYMENT.md`).
- Deploy only from reviewed `main` (`README.md`).
- A content or navigation change also updates the brand facts, the UX scenarios, flows and screens,
  the sitemap and the build allow-list where routes change, and the handoff (`docs/DOCMAP.md`,
  "Propagation"). A change to this repository's role, dependencies or test command updates its row
  in org-index `repositories.json` in the same change.

## Organisation

This repository is one of the `passioncode-ai` repositories. The org map —
which repository owns what and how they connect — is
[passioncode-ai/org-index](https://github.com/passioncode-ai/org-index) (private; readable by every
org member), with [ONBOARDING.md](https://github.com/passioncode-ai/org-index/blob/main/ONBOARDING.md)
for a new contributor's machine. The working rules are the knowledge base's
[rules.md](https://github.com/passioncode-ai/fabric-workspace/blob/main/knowledge/rules.md).

## After work

In the same run: update this repository's docs with the change; if a cross-repository fact changed
(a product, a version, a plan row, a principle), update the page in `fabric-workspace/knowledge/`
that owns it; land both; publish (`node scripts/workspace.mjs sync` from a Fabric checkout) or
leave it to the scheduled sync. Leave a handoff with the exact next task.
