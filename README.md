<p align="center">
  <img src="assets/icon-256.png" width="128" height="128" alt="PassionCode.ai passion fruit mark">
</p>

# PassionCode.ai

> **From vibe coding to passion coding.**
>
> **The agent-agnostic operating system for AI-native teams.**

This repository contains the dependency-free static site for
[passioncode.ai](https://passioncode.ai/). Cloudflare Workers serves the static artifact
from its edge network; the public page remains complete without client-side JavaScript.

**Stop managing agents one by one. Start operating projects.** A Project keeps its
purpose, team, routines, authority, work, evidence and feedback loop together while
agents and providers can change.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. The production site is published from `main` through
Cloudflare Workers Builds. The hosted PassionCode.ai product is in active development
and is not publicly available yet.

## Approved brand

The complete graphical pack is vendored in [`brand/`](brand/README.md). `brand/LOCK.json`
pins the approved source and exports, and `npm run check` rejects unreviewed visual drift.
The runtime assets in [`assets/`](assets/README.md) must remain byte-identical to their
locked canonical files.

## Deployment

The Worker configuration, build path and custom-domain handoff are documented in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
