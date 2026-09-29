<p align="center"><img src="assets/icon-256.png" width="128" height="128" alt="PassionCode.ai passion fruit mark"></p>

# PassionCode.ai

**A toolkit for AI-native teams.** From vibe coding to passion coding.

Public home: [passioncode.ai](https://passioncode.ai/). Available now: Switchboard, a local account workbench for Claude Code and Codex CLI (beta); Project Observatory, a local dashboard for the projects your agents work on; and Fabric Dashboards, one window for the local agent services on a Mac. All three are source-available under PolyForm Noncommercial or Internal Use; a commercial license is available on request. Fabric, the CEO AI agent, is an early preview (0.2.0, macOS); its source is private. Fabric Inbox, a desktop mail client, is in development. People remain accountable.

## Pages and shared design

- [Homepage](index.html): toolkit work cycle, downloads, build pipeline, source and author.
- [Project Observatory](observatory/index.html): local project dashboard, setup and source.
- [Fabric](fabric/index.html): CEO AI agent early preview, requirements and macOS download.
- [Fabric Inbox](inbox/index.html): desktop mail client in development.
- [Switchboard](switchboard/index.html): product, platform downloads, limits and installation.
- [Design system](design-system/README.md): canonical dark/gold tokens and product marks. Switchboard vendors a commit-pinned copy.
- [Launch handoff](docs/HANDOFF.md): source owners, checks, publication and next work.

The HTML is complete without client-side JavaScript. Cloudflare Workers serves an explicit static asset allowlist and stable OS download redirects. [Release manifest](switchboard/release.json) selects a verified public release, including an intentional prerelease; it does not assume GitHub's latest stable release is the newest beta.

## Preview and checks

```sh
npm ci
npm run check
npm run preview -- --port 4173
```

Use the Worker preview to exercise download redirects. A plain static server only previews the HTML. Deployment from reviewed `main` uses `npm run deploy`; see [deployment contract](docs/DEPLOYMENT.md).

## Approved brand

The passion-fruit identity remains locked in [brand](brand/README.md). `npm run check` verifies those bytes. The new [shared design system](design-system/README.md) adds reusable semantic tokens and the yellow S mark without replacing the parent brand.
