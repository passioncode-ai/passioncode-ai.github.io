<p align="center"><img src="assets/icon-256.png" width="128" height="128" alt="PassionCode.ai passion fruit mark"></p>

# PassionCode.ai

**A toolkit for AI-native work.** From vibe coding to passion coding.

Public home: [passioncode.ai](https://passioncode.ai/). Switchboard is the first downloadable open-source beta: a local account workbench for Claude Code and Codex CLI. Fabric is the CEO AI agent in development, coordinating agents around projects. People remain accountable.

## Pages and shared design

- [Homepage](index.html): toolkit and product status.
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
