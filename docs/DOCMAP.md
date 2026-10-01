# Public website documentation

- Owner/scope: this repository owns passioncode.ai, its public product descriptions,
  download routing and shared web design reference. It does not own native release acceptance.
- Truth: shipped HTML and the release manifests (`switchboard/`, `fabric/`, `inbox/release.json`); brand facts point to public release
  receipts and identity sources. UX describes the public visitor paths.
- Propagation: content/navigation → HTML, brand projections/facts/actions, UX scenarios/flows/screens,
  sitemap, build allowlist where routes change, README and task handoff. Immutable launch receipts
  describe their own release and are preserved; a newer receipt never silently rewrites them.
- Checks: `npm run check`, `npm run build`, `python3 scripts/extract-public-copy.py --check`;
  UX and brand lint use installed super-ux scripts recorded in the task evidence. Browser checks
  are recorded separately from static checks and native application acceptance.

Local task status: [backlog](backlog.md), collected through [manifest](backlog-sources.json).

Entry: [HANDOFF](HANDOFF.md); current task [agent workplace](tasks/2026-10-01-agent-workplace.md).
