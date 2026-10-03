# Website backlog

Canonical owner: this repository. The [manifest](backlog-sources.json) collects these
rows into the workspace’s agent-workplace goal. IDs persist; completion does not erase history.

| ID | Item | Status | Evidence / next action |
|---|---|---|---|
| SITE-001 | Explain the composable agent workplace and every public product’s utility | closed | [Deployment and live checks](tasks/2026-10-01-agent-workplace.md#production-receipt) |
| SITE-002 | Replace Switchboard’s browser-demo screenshot with a current native screenshot | open | [Earlier handoff](HANDOFF.md#current-handoff--switchboard-v040-beta1-selected-2026-10-01); use synthetic data and label the actual app/version |
| SITE-003 | Propagate the next published product release to pages, manifests and facts | open | Recurring release trigger; [DOCMAP](DOCMAP.md), owner release receipt required |
| SITE-004 | Update Fabric’s MCP statement when its northbound entry ships | blocked | Fabric AR-3 prerequisite; current page truthfully says no MCP entry of its own |
| SITE-005 | Reconcile remaining brand-lint interface registry advisories after semantic HTML extraction | open | [Consumer audit](tasks/2026-10-01-copy-guard.md#brand-pack-consumer-audit); preserve proposed/agreed decisions, distinguish interface controls from marketing prose, and do not register paragraphs as labels merely to silence B022 |
| SITE-006 | Serve Fabric 0.3.0: point `fabric/release.json` at `https://github.com/passioncode-ai/fabric/releases/download/v0.3.0/Fabric-0.3.0-arm64.dmg` with the SHA-256 from that release's `SHA256SUMS`, then the page and the facts row in the same change (today the manifest serves `fabric-v0.2.0` from this repository) | blocked by the Fabric v0.3.0 publication — tag `v0.3.0` exists and release run [37159239646](https://github.com/passioncode-ai/fabric/actions/runs/37159239646) waits for `release-approvers`; the release coordinator makes the edit | [Fabric release workflow](https://github.com/passioncode-ai/fabric/actions/workflows/release.yml); [DOCMAP](DOCMAP.md) propagation; SITE-003 is the recurring rule |
| SITE-007 | Name the current Project Observatory release on the site (it still named 0.13.0 after 0.14.0 shipped) | closed | `d0f0275` (#35): page, card, facts and SCN-006 name 0.15.0, verified against the v0.15.0 sums and signature; live `https://passioncode.ai/observatory/` reads "Latest release: 0.15.0" (curl, 2026-10-04) |
| SITE-008 | Show the launcher install line on the Switchboard page once the launcher family lists the Switchboard plugin | blocked by passioncode PC-02 | [Switchboard v0.4.0-beta.1 handoff](HANDOFF.md#current-handoff--switchboard-v040-beta1-selected-2026-09-30): `switchboard/release.json` has `launcherPlugin: false`; when [PC-02](https://github.com/passioncode-ai/passioncode/blob/main/docs/backlog.md) lands, rerun `node scripts/update-switchboard-release.mjs <selected tag>`, check and deploy |
