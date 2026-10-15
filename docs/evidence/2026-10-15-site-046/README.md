# SITE-046 — Fabric's Windows and Linux downloads on /fabric/ (2026-10-15)

Fabric 0.3.5 (GitHub pre-release, 2026-10-12) ships, besides the universal DMG, Authenticode-signed per-user
Windows installers for x64 and arm64 and a `.deb` and an AppImage for Linux x64 and arm64. Its notes said "the
download page on passioncode.ai offers the Mac build until its own change"; this is that change.

## What changed

- `releases/products.json`: Fabric's policy names seven assets (`macos`, `windows-x64`, `windows-arm64`,
  `linux-x64-deb`, `linux-arm64-deb`, `linux-x64-appimage`, `linux-arm64-appimage`). The policy reads GitHub's
  release list (`/releases?per_page=30`) with `channel: "prerelease"`, so the all-pre-release Fabric needs no
  `releases/latest` (which answers 404 for it). `npm run releases:sync` rewrote `releases/current.json`, and moved
  Switchboard to 0.6.33 and the launcher to 0.2.5 on the way (version, checksums and downloads only).
- `worker/index.js`: a platform in `/<product>/download/<platform>` is lowercase words joined by hyphens.
- `worker/releases.js` `mergeSnapshots`: for the same tag the merge keeps the union of the bundled floor's and the
  stored answer's assets, so the D1 snapshot stored before this deploy (Fabric 0.3.5 with the DMG only) cannot hide
  the new routes until the next refresh. Tests: `scripts/releases.test.mjs` (same tag keeps the floor's extra
  assets; a newer release brings only its own), `scripts/check-worker.mjs` (all seven Fabric routes redirect;
  `/fabric/download/windows`, `windows-`, `Windows-x64`, `linux--deb` fall through).
- `/fabric/` (and its nine translations, catalogs `i18n/<code>/fabric.json`): macOS, Windows and Linux cards; the
  Windows card offers x64 with arm64 as a link, the Linux card the x64 `.deb` with the arm64 `.deb` and both
  AppImages as links and why the `.deb` is preferred; "Before you open it" names Docker and the Supabase CLI on every
  system (Docker Desktop or OrbStack and `brew install supabase/tap/supabase` on macOS, Docker Desktop with WSL2 and
  `scoop install supabase` on Windows, Docker Engine on Linux) and what is not there yet (CO-244, CO-245, named
  without their ids). Hero: "Download Fabric" → #download, caption "macOS, Windows and Linux"; title, description
  and SoftwareApplication `operatingSystem` name the three systems. No system is detected: no product page detects
  one (Switchboard shows its macOS and Windows cards side by side), so every card is visible.
- Sources of the requirements: Fabric README on `main` ("Install": "Every OS needs Docker (Docker Desktop, or Docker
  Engine on Linux) and the Supabase CLI"; prefer the `.deb`) and the v0.3.5 notes ("Windows", "Linux", "Not yet on
  Windows and Linux").
- `scripts/check-site.mjs`: every Fabric asset in the snapshot has its link on the page; the per-system
  requirements and the limits are present; each language's `_checks.json` keeps the Windows and Linux links,
  `WSL2` and `scoop install supabase`.
- Docs: facts rows *Fabric release* (0.3.5, all builds, requirements, limits) and *CEO name and status*; SCN-007,
  the /fabric/ screen, strings registry, DEPLOYMENT (routes, same-tag asset union), `llms.txt`.

## Checks

- `npm run check` exit 0; `npm run build` 224 entries; `npm run locales -- --check` PASS (10 languages).
- `wrangler dev --local --local-protocol https`: the seven `/fabric/download/<platform>` routes answer 302 to the
  v0.3.5 assets; `/fabric/download/windows` answers 404.
- WebKit (Playwright 1.61.1, WebKit 2336) on the local Worker, `/fabric/`, `/ru/fabric/`, `/ja/fabric/`,
  `/de/fabric/` at 1440 and 390 px: no horizontal overflow, nothing past the viewport in #download, seven download
  links, two columns at 1440 and one at 390, no page errors ([webkit.json](webkit.json),
  [webkit-check.cjs](webkit-check.cjs)).

## Shipped

PR #140 merged as `991691b` (CI `check` passed); `npm run releases:check` on `main` PASS. Deployed from `main` with
`npm run deploy` as Worker version `2c9d1f94-d81b-412c-804e-ba3f95e9e7de`. `scripts/verify-live.py` PASS, 263 of 263
checks: 224 assets (150 pages, 15 in each of ten languages), 13 download routes — `/fabric/download/macos`,
`windows-x64`, `windows-arm64`, `linux-x64-deb`, `linux-arm64-deb`, `linux-x64-appimage` and `linux-arm64-appimage`
each 302 to the v0.3.5 asset right after the deploy — 23 not-found addresses and the intake in dry-run mode
([live.json](live.json)).
