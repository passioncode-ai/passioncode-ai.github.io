# Inbox page — 2026-09-28 copy update

Objective: the `/inbox/` page states what Fabric Inbox does after the 2026-09-28 run — important
mail first across accounts, project addresses answered by agents within a reply policy — and
exactly how far it has come (tested with synthetic mail, not with real accounts).

Source of the facts: passioncode-ai/fabric-inbox branch `agent/agents-triage-2026-09-28`, run
brief `docs/app-store/tasks/2026-09-28-agents-triage-run.md` and release entry
`docs/app-store/README.md`. Rows updated in [facts](../brand/facts.md).

Changed: `inbox/index.html` (title, description, hero, "What it does", status, FAQ; the broken
FAQ answer that ran two links together — "InboxFabric is the CEO AI agent" — is rewritten),
`docs/brand/copy/inbox-index.md` (regenerated), `docs/brand/facts.md`.

Checks run: `npm run check` PASS (brand lock, 6 pages, worker, 35 contrast pairs);
`python3 scripts/extract-public-copy.py --check` PASS; `npm run build` PASS (23 entries);
browser at 1400×900 and phone width: no horizontal scroll.

Not done: deployment. Publishing follows [DEPLOYMENT.md](../DEPLOYMENT.md) and needs the
operator's go for this branch; the live page still shows the 2026-09-26 copy.
