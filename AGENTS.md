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
| Test (the gate) | `npm run check` — brand lock, release contracts, site structure, Worker, design tokens, display-copy regression tests and source gate, fresh copy projections |
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
- [switchboard/release.json](switchboard/release.json), [fabric/release.json](fabric/release.json) and
  [inbox/release.json](inbox/release.json) select the public releases that the download redirects serve.
- The Worker is `worker/`, configured by `wrangler.json`. The pages are `index.html` and one
  directory per product.
- Launch receipts in `docs/` (`*_RECEIPT.*`) describe their own release and are never rewritten.

## Local rules

- This repository is public. Nothing private may be added, and visitors are never linked to a
  private repository (Fabric Workspace and org-index are the private ones).
- License wording follows Fabric ADR-0092 and the knowledge base
  [licensing](https://github.com/passioncode-ai/fabric-workspace/blob/main/knowledge/licensing.md):
  every product with a page here has public source (Fabric and Fabric Inbox since 2026-09-30) and is
  "open source under the GNU AGPL-3.0" with a commercial license available; MIT and PolyForm name only
  released versions, inside `<!-- license-history -->` regions. `scripts/check-site.mjs` enforces both.
- The deploy artifact is an allow-list, not the repository root. Documentation and repository
  metadata stay out of the public asset namespace (`docs/DEPLOYMENT.md`).
- Deploy only from reviewed `main` (`README.md`).
- A content or navigation change also updates the brand facts, the UX scenarios, flows and screens,
  the sitemap and the build allow-list where routes change, and the handoff (`docs/DOCMAP.md`,
  "Propagation"). A change to this repository's role, dependencies or test command updates its row
  in org-index `repositories.json` in the same change.
- **Shared registers are edited under a lease.** [docs/AGENT_SYNC.md](docs/AGENT_SYNC.md)
  (generated from `.claude/agent-sync.json` by `agent_sync.py setup`; never edited by hand) lists
  the guarded files and the gate. Run `agent_sync.py acquire <file>` before editing one and
  `agent_sync.py release <file>` after, on every path including failure. The lease is a ref under
  `refs/agent-sync/leases/` on `origin`, so another contributor's agent sees it
  (`git ls-remote origin 'refs/agent-sync/leases/*'`); the record plane is local (`fs`), and
  `.agent-sync/` is git-ignored. No register here carries a "Next free ID" line, so nothing is
  reserved yet; a register that gains one is declared under `idRegisters` and taken with
  `agent_sync.py reserve <REG>`.

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

## Shared backlog

Canonical site tasks live in [docs/backlog.md](docs/backlog.md), registered by
[docs/backlog-sources.json](docs/backlog-sources.json). Edit the owning source under
an agent-sync lease; keep stable IDs and completed history. Cross-project goals and
the merge protocol live in the [workspace backlog](https://github.com/passioncode-ai/fabric-workspace/blob/main/knowledge/backlog.md).
After landing, publish through Fabric workspace sync (or its scheduled run).
https://wiki.passioncode.ai/backlog is a derived aggregate, never a second editable
status. A task belongs to one repository; dependencies link to canonical task IDs.
