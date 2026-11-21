# The commerce backlog: everything between a visitor and a customer (the site's view)

Collected 2026-11-21 on the owner's order («давай соберём в эту коммерцию, которую мы там обсудили, весь backlog»,
Telegram 2026-11-21 03:09, CEO board request `a72e1941`). Part of [SITE-079](README.md).

This repository is public, so this file holds the funnel and the site's own rows only. The full backlog, with the
offers and prices on record, the state of work held in other projects and the gates that need the owners, is kept
in the organization's private workspace: fabric-workspace `docs/plans/2026-11-21-commerce-backlog/README.md` (pull
request 945, commit `3fea0efc`).

This file is an index, not a second status. A row belongs to one repository and keeps its status there; the site's
rows live in [docs/backlog.md](../../backlog.md).

## 1. The line we sell on

Free for people, paid for organizations and the cloud. Every product stays open source under AGPL-3.0, with a
commercial license available (`docs/brand/facts.md`, rows *license* and *license short line*).

| Offer | Door on the site | Price on the site |
|---|---|---|
| Free, for a person | `/start/` («Try Fabric free»), the main call to action | free |
| Personal cloud | `/pricing/`, then the account | shown when the account is live and the owners have set it |
| Organization | `/assessment/` | by offer after the assessment |
| Enterprise | `/assessment/` | by offer after the assessment |
| Cloud instance | `/cloud/`, then a request | not shown until set |
| Services | the free one-week assessment | by offer after the assessment |
| Commercial license | `/business/#request` | on request |

## 2. The funnel and what each step still needs

| Step | What a visitor does | Exists today | Missing | Owner | Row |
|---|---|---|---|---|---|
| 1. Find us | search, a post, a shared report | the site in ten languages, guides, blog, the daily digest | the structure of SITE-079; pain guides; indexing of the new URLs | the site | SITE-080, SITE-088 |
| 2. Understand the promise | reads the home | the home of SITE-072 | the Humanless home with one call to action | the site | SITE-081 |
| 3. Understand the product | Fabric, the CEO agent, parts, features | four part pages, `/fabric/` | `/fabric/ceo/`, four part pages, ten feature pages | the site; facts from each product's project | SITE-082, SITE-083, SITE-084 |
| 4a. A person starts free | copies the command | `/start/`, the launcher | the offer of a backup as the first paid step | the product and the platform | the private backlog |
| 4b. An organization starts | follows the rabbit, the assessment | the story landing, Morpheus's bot, the form, the guide | `/assessment/`, the big rabbit, the chat, the three cases | the site; the product's assessment agent | SITE-085, SITE-086, SITE-087, SITE-090 |
| 5. The request arrives | a lead | `POST /api/leads` (lead/2) | a source value for the chat and the assessment's answers, as a new contract version | the platform | asked on the board |
| 6. The assessment runs | one week, read-only | the assessment as described in `/guides/free-assessment/` | the product's own assessment and its owner | to be named | the private backlog |
| 7. The offer | a ready offer for the first process | by offer | the three cases as offers | go-to-market | asked on the board |
| 8. Sees the price | the pricing page | none | `/pricing/` | the site; the platform; the owners | SITE-089 |
| 9. Pays | account, plan | none on the site | the account and its links | the platform | the private backlog |
| 10. Gets what was paid for | the cloud | none public | the cloud's forms | the platform and the product | the private backlog |
| 11. Stays and grows | updates, more agents | the agent templates | the organization tier's upkeep | the agents library, the platform | the private backlog |
| 12. We read the numbers | the funnel by step | site events, lead counts | the funnels of SITE-079 SF-11 | the site, analytics | SITE-080 |

## 3. The site's rows

| Row | What | State |
|---|---|---|
| SITE-079 | the spec, the SEO brief, the scenarios, this backlog | done 2026-11-21 |
| SITE-080 | structure: registry, header and footer, content kinds, sitemap, events scaffold | open |
| SITE-081 | the Vision home; the brand pack rows for «humanless» and the CEO agent | open |
| SITE-082 | `/fabric/` and `/fabric/ceo/` | open |
| SITE-083 | part pages: adapter, launcher, relay, Okolos; the toolkit line on the four live ones | open |
| SITE-084 | feature pages: security, cloud, open source, Memory, sessions, board, Create, Reports, mobile; agent-agnostic | open |
| SITE-085 | `/business/` with the three cases and the assessment first | open |
| SITE-086 | `/assessment/`, the big White Rabbit and its jump, the chat slot, the lead source | open |
| SITE-087 | the three case pages | open |
| SITE-088 | the pain guides | open |
| SITE-089 | `/pricing/`, «Sign in», the account links | open, waits on the platform and the owners |
| SITE-090 | the assessment agent's chat on `/assessment/` | open, waits on the assessment's owner |
| SITE-069 | the organizations' overview PDF and its link in the lead receipt | open |
| SITE-077 | the case page «How it works» on a neutral organization | open |
| SITE-078 | the order of 2026-11-19; its steps are carried by SITE-081, SITE-086, SITE-090 | open, superseded as the structure's source |

## 4. What waits on a person

Each deploy of a site row to the live site (the owner's word for that deploy); the prices and the day they become
public; the terms of the license and of free use; the owner of the product's assessment. The details are in the
private backlog.

## 5. What is deliberately not here

A partner channel, a marketplace and advertising campaigns: each has its own order or is on hold.
