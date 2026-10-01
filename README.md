<p align="center"><img src="assets/icon-256.png" width="128" height="128" alt="PassionCode.ai passion fruit mark"></p>

# PassionCode.ai

**A toolkit for AI-native teams.** From vibe coding to passion coding.

Public home: [passioncode.ai](https://passioncode.ai/). PassionCode.ai is the organization; Fabric is its product, and Fabric's tools carry its name. Available now: Fabric Switchboard, a local account workbench for Claude Code and Codex CLI (beta, 0.4.1-beta.1); Project Observatory, a local dashboard for the projects your agents work on (0.10.0); and Fabric Dashboards, one window for the local agent services on a Mac (0.3.1). Fabric, the CEO AI agent, is an early preview (0.2.0, macOS), and Fabric Inbox, its mail tool, a development preview (0.8.2, macOS). All five are open source under AGPL-3.0; a commercial license is available. People remain accountable.

## Pages and shared design

- [Homepage](index.html): product chooser, agent workplace, releases, launcher/Adapter setup and source-build projects.
- [Project Observatory](observatory/index.html): local project dashboard, setup and source.
- [Fabric](fabric/index.html): CEO AI agent early preview, requirements and macOS download.
- [Fabric Dashboards](dashboards/index.html): service dashboard, pinned 0.3.1 DMG, requirements, checksum and MCP setup.
- [Fabric Inbox](inbox/index.html): desktop mail client in development preview, macOS download and agent connection.
- [Switchboard](switchboard/index.html): product, platform downloads, limits and installation.
- [Design system](design-system/README.md): canonical dark/gold tokens and product marks. Switchboard vendors a commit-pinned copy.
- [Launch handoff](docs/HANDOFF.md): source owners, checks, publication and next work.

The HTML is complete without client-side JavaScript. Cloudflare Workers serves an explicit static asset allowlist and stable OS download redirects (`/switchboard/download/<os>`, `/fabric/download/macos`, `/inbox/download/macos`, each from its product's `release.json`). [Release manifest](switchboard/release.json) selects a verified public release, including an intentional prerelease; it does not assume GitHub's latest stable release is the newest beta.

## Preview and checks

```sh
npm ci
npm run check
npm run preview -- --port 4173
```

Use the Worker preview to exercise download redirects. A plain static server only previews the HTML. Deployment from reviewed `main` uses `npm run deploy`; see [deployment contract](docs/DEPLOYMENT.md).

## Quick start for a new teammate

1. **Install:** nothing to install — the product is the live site, https://passioncode.ai/.
   For work: `npm ci`, then `npm run check` and `npm run build`.
2. **Configure:** no key for preview or checks. Only a deploy needs a Cloudflare login to the
   organization's account (`npx wrangler login`, or a scoped API token in `CLOUDFLARE_API_TOKEN`
   issued by the operator) and the account id in `CLOUDFLARE_ACCOUNT_ID` ([deployment](docs/DEPLOYMENT.md)); `npx wrangler deploy --dry-run --outdir <dir>` bundles without one.
3. **MCP:** none; the site neither serves nor calls MCP.
4. **Develop:** `npm run preview -- --port 4173` serves the Worker locally. Pages are `index.html`
   and one directory per product, the Worker is `worker/`; [docs/DOCMAP.md](docs/DOCMAP.md) says
   what each change must also update, and [AGENTS.md](AGENTS.md) holds the rules.

## Approved brand

The passion-fruit identity remains locked in [brand](brand/README.md). `npm run check` verifies those bytes. The new [shared design system](design-system/README.md) adds reusable semantic tokens and the yellow S mark without replacing the parent brand.

## License

Open source under the [GNU AGPL-3.0](LICENSE). A [commercial license](COMMERCIAL-LICENSE.md) is
available for use that does not meet the AGPL's terms — contact@passioncode.ai.

## Backlog

[Local tasks](docs/backlog.md) remain canonical here. [Source manifest](docs/backlog-sources.json) feeds the workspace aggregate; see [agent rules](AGENTS.md#shared-backlog).
