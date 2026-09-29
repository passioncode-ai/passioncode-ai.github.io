# Fabric early preview download — 2026-09-29

**Objective (operator request, 2026-09-29):** Fabric installable from a DMG and downloadable
from its page on passioncode.ai, with screenshots of the actual app.

## REQ

| # | Requirement | Verified by |
|---|---|---|
| R1 | `/fabric/` offers the macOS download beside its requirements and limits | `scripts/check-site.mjs` (the Fabric block) |
| R2 | `/fabric/download/macos` redirects to the public release asset, no-store, noindex; no other platform | `scripts/check-worker.mjs` |
| R3 | The page names the version the manifest selects and links its release notes | `fabric/release.json` + `scripts/check-site.mjs` |
| R4 | Screenshots are the actual window on synthetic demo data | `assets/fabric-*.jpg`, taken from the notarized `Fabric.app` on the demo estate `…0e0e40` (`-v lang=en`) |
| R5 | No link to private Fabric source | `scripts/check-site.mjs` |
| R6 | Homepage, brand facts, strings, voice, terminology and UX docs say "early preview", not "no download" | this change |

## Facts and their receipts

- Build: Fabric 0.2.0, commit `f3569996de02f330e55d8e041e5d5df178323bcf` of the private source;
  `Fabric-0.2.0-arm64.dmg`, 167 134 889 bytes, SHA-256
  `ae04aabdf67c62bd74c4e8d1d0a8e120998b031e0d37a81c3c3309e57b2b9ae6`; Developer ID signed,
  hardened runtime, notarized (DMG submission `8daf0d53-9d27-4423-8381-93575062ec05`, Accepted),
  stapled; Gatekeeper accepted the app and the DMG; `LSMinimumSystemVersion` 13.0.
- Packaged smoke (`chat-activation-native.test.mjs` against the built app): starts from its own
  stack, chat saves "saved, no reply yet", survives a cold restart without resending.
- Hosting: the Fabric source repository is private, so the DMG is an asset of the release
  `fabric-v0.2.0` in this public repository.

## Checks run

`npm run check` (4 PASS lines), `npm run build` (27 public entries), `extract-public-copy.py --check`.
Planted and watched red: the page claiming Fabric replies; a malformed SHA-256 in the manifest.
Worker preview: `/fabric/download/macos` → 302 to the release asset with `Cache-Control: no-store`
and `X-Robots-Tag: noindex`; the three screenshots and `fabric/release.json` served 200; at
1280×800 and 390×844 no horizontal overflow and the primary CTA «Download for macOS» in the
first viewport.
