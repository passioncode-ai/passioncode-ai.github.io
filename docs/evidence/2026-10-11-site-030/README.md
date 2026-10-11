# SITE-030 — platform copy for the 2026-10-11 releases

Branch `agent/site-030`, 2026-10-11. Every changed claim, the release that proves it and how it was read.
`visual.json` is the WebKit pass; `live.json` (added after the deploy) is `scripts/verify-live.py`.

## Release evidence read

| Release | Read with | What it proves |
|---|---|---|
| Fabric Inbox [v0.14.1](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.14.1) | `gh release view v0.14.1 -R passioncode-ai/fabric-inbox`; `gh release download v0.14.1 -p '*.receipt.json' -p 'update-*.json'` | notes: Windows installers, uninstaller and the app's programs carry a timestamped Authenticode signature. `Fabric-Inbox-0.14.1-win-{x64,arm64}.receipt.json`: `windows_authenticode.status: SIGNED`, installer and five app files `Valid`. Update feeds exist for mac, win32 x64/arm64 and the Linux AppImage x64/arm64 (none for `.deb`) |
| Fabric Inbox [v0.15.0](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.15.0) (published during this task, 12:14 UTC) | `gh release view v0.15.0`; its Windows and macOS receipts | Windows installers still `SIGNED`/`Valid`; DMG notarization accepted and stapled. `npm run releases:sync` moved the site to 0.15.0 |
| Fabric Inbox [v0.14.0](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.14.0) | `gh release view v0.14.0` | the Windows installer is per user with no administrator rights; the AppImage replaces itself, a `.deb` copy does not update itself; Linux keeps the sign-in in the Secret Service and does not start without one |
| Project Observatory [v0.22.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.22.0) | `gh release view v0.22.0`; `gh release download v0.22.0 -p '*receipt.json' -p latest.json -p SHA256SUMS`; README, `docs/desktop/SCENARIOS.md`, `docs/design/WINDOWS-LINUX.md` at `v0.22.0` | Windows x64/arm64 setup `windows_authenticode: SIGNED`, signature `Valid`, `install: PASS`; Linux x64/arm64 AppImage and `.deb`, `deb-install: PASS`; `latest.json` names windows-x86_64/aarch64 and linux-x86_64/aarch64 (setup `.exe`, AppImage); README: engine on Windows needs Python 3.13+, the app needs the engine installed first, a `.deb` copy is updated by the next `.deb`. Mac app re-downloaded: `shasum -a 256 -c` OK, `spctl` accepted (Notarized Developer ID), `lipo -archs` `x86_64 arm64`, minimum macOS 14.0 |
| Fabric Dashboards [v0.7.1](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.7.1) | `gh release view v0.7.1 --json assets`; CHANGELOG 0.7.0 at `v0.7.1` | DMG, Windows x64/arm64 setup, Linux x64/arm64 AppImage and `.deb`; self-updates on macOS only (facts row, coordinator note: M4) |
| Fabric Switchboard [v0.6.16](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.6.16) | `gh release view v0.6.16`; `gh release download v0.6.16 -p '*windows*receipt*.json'` | setup, `switchboard.exe` and `fabric-switchboard.exe` each `Valid`, `windows_authenticode: SIGNED` (x64 and arm64) |

## Changed claims (English; nine other languages follow from the catalogs)

| Where | Before | After |
|---|---|---|
| /inbox/ title | … · macOS preview | … · desktop preview |
| /inbox/ meta, OG, Twitter | Development preview for macOS. | Development preview for macOS, Windows and Linux. |
| /inbox/ JSON-LD `operatingSystem` | macOS 12 or later | macOS 12 or later, Windows, Linux |
| /inbox/ hero line | · macOS 12 or later · | · macOS 12+ · Windows · Linux · |
| /inbox/#download heading | A development preview for your Mac | A development preview for Mac, Windows and Linux |
| /inbox/#download | The Mac app creates its mail server… | The app creates its mail server… |
| /inbox/#download | (no Windows or Linux) | new card «Windows and Linux»: Windows installer x64/arm64, no administrator rights, Authenticode-signed since 0.14.1; Linux AppImage and .deb x64/arm64; the Windows app and the AppImage update themselves, a .deb copy does not; Linux needs a Secret Service. Button to the latest release page |
| /observatory/ meta | …local dashboard from PassionCode.ai, in English or Russian. | …for macOS, Windows and Linux, in English or Russian. |
| /observatory/ JSON-LD | macOS; Linux | macOS; Windows; Linux |
| /observatory/ hero status | Open source · macOS + Linux · Python 3.11+ | Open source · macOS + Windows + Linux · Python 3.11+, 3.13+ on Windows |
| /observatory/ step 01 | On macOS, use Homebrew Python. | + On Windows, use Python 3.13 or newer and the PowerShell steps in the installation guide. |
| /observatory/ Mac app note | signed with a Developer ID and notarized by Apple, for macOS 14+ | one app for Apple silicon and Intel, signed …, for macOS 14+ |
| /observatory/ | (no Windows or Linux app) | Windows and Linux app since 0.22.0: Windows installer x64/arm64, no administrator rights, Authenticode-signed; AppImage and .deb x64/arm64; needs the engine installed, does not install it; updates itself except a .deb copy |
| /dashboards/ meta, OG, Twitter | One Mac window for your local agent services. | One window for your local agent services on macOS, Windows and Linux. |
| /dashboards/ hero | See every agent service on your Mac in one app | …on your computer in one app |
| /dashboards/#services | discovers compatible services on your Mac | …on your computer |
| /switchboard/ Windows card | Built natively on Windows, not yet Authenticode-signed, so SmartScreen may show a warning. | Built natively on Windows. The installer, the app and the CLI are Authenticode-signed since 0.6.16. |
| /switchboard/ requirements | The Windows build is not yet Authenticode-signed. | The Windows build is Authenticode-signed since 0.6.16. |
| Home tools list | Observatory · macOS + Linux; Inbox · macOS | both · macOS + Windows + Linux |
| llms.txt | Observatory «macOS and Linux»; Inbox and Dashboards without systems; Switchboard without signing | each line names its systems, signing and which copies update themselves |

Not claimed: that SmartScreen never warns (the receipts prove the signature, not reputation); that a person has
run the Observatory Windows or Linux app (its desktop scenarios are `draft` at `v0.22.0`).
