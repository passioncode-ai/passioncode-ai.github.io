# PassionCode.ai deployment

## What is automated

- A push to `main` deploys the static site through `.github/workflows/pages.yml`.
- `CNAME` binds the Pages site to `passioncode.ai`.
- `npm run check` validates the site structure, canonical copy and social-card size.

## DNS handoff

At the Cloudflare DNS zone for `passioncode.ai`, remove the current Namecheap URL
forward and replace the public records with GitHub Pages records:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `passioncode-ai.github.io` |

Keep the records DNS-only until GitHub has issued the certificate. Then enable
**Enforce HTTPS** in the repository Pages settings. Cloudflare proxying can be
enabled afterwards if it is still wanted.

Source checked 2026-09-03:
[GitHub Pages custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Verification

```bash
dig +short passioncode.ai A
dig +short passioncode.ai AAAA
dig +short www.passioncode.ai CNAME
curl -I https://passioncode.ai/
```

The expected final result is an HTTPS `200` response from GitHub Pages and automatic
redirection of `www.passioncode.ai` to the apex domain.
