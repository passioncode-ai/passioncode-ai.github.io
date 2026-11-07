# SITE-050 live check, 2026-11-07

`live.json`: `python3 scripts/verify-live.py` against https://passioncode.ai at source commit `a469090`, 2026-11-07
10:31 UTC. 264 checks, 262 pass, 2 differ:

| Path | Why it differs | Owner's step |
|---|---|---|
| `/robots.txt` | Cloudflare's managed robots block is prepended at the edge, so the served bytes differ from the repository's | a Cloudflare zone setting, or accept the managed block in the check |
| `/switchboard/release.json` | still serves `v0.7.21` at 15:57 UTC with a cache-busting query (`cf-cache-status: HIT`, etag `8fe80ab1...`), while `main` and a fresh `npm run build` hold `v0.7.22`: the deployed assets predate `#150` | redeploy `main` (`npm run deploy`); the agent's attempt on 2026-11-07 15:58 UTC was refused by the coding harness's safety classifier, so it waits for the operator |
