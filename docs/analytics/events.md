# passioncode.ai events (catalogue)

Owner: this repository. Rules: sshlg-analytics-agent `docs/guidance/events.md` (a name is a time series, the place is a
property, values are closed, nothing is renamed or redefined, a retired event is marked with its date). Reviewed on the
board, thread `90a63b21` (2026-11-06). Sink: the organization's Aptabase `https://analytics.passioncode.ai`, app
«PassionCode Site», growth app `passioncode-site`. Code: `worker/analytics.js` (`EVENTS` is the list the Worker
accepts; `scripts/check-analytics.mjs` fails when this table misses one of its events or properties).

## What an `iid` is

A **visitor-day**, never a person or an installation: a UUIDv8 the Worker makes from an HMAC of the day's random salt,
the IP and the User-Agent. The salt changes every UTC day and older salts are deleted by the cron; nothing is read from
or written to the visitor's device; IP and User-Agent never leave the Worker. Consequences: funnels across pages hold
within one UTC day and break at midnight UTC; people behind one NAT with one browser merge into one id; a phone that
changes network splits into two; growth's `uniqueInstalls` over several days counts visitor-days, so read
`dailyVisitors` and never add days. Growth's own A/B assignment does not fit the site (a new id every day): a site test
assigns its arm itself (`assignment: external`, `experiment_exposure`) and measures within one visit. Do Not Track or
Global Privacy Control in the request: nothing is sent.

Every event carries `page`, `lang` (the page's language or `other`), `iid`, `environment` (`production` on
passioncode.ai, `sandbox` elsewhere) and `platform: web`.

## Events

| Event | Status | Properties and values | Sent from |
| --- | --- | --- | --- |
| `page_view` | live from SITE-049 | `page`: home, vision, start, business, business-thanks, privacy, switchboard, switchboard-agents, fabric, fabric-agents, inbox, dashboards, observatory, design-system, not-found, other | every page, on load |
| `cta_click` | live from SITE-049 | `page` as above; `location`: header, hero, video, problem, shift, fabric, system, agents, grow, doors, products, source, faq, about, investors, footer, start, business, request, other; `target`: business, start, setup, github, investors, mail, fabric, products, vision, switchboard, dashboards, observatory, inbox, x, download, other | links and buttons carrying `data-cta` |
| `video_progress` | live from SITE-049 | `page`; `percent`: "0" (play), "25", "50", "100" (strings: growth's `where` reads string properties) | the home video |
| `command_copy` | live from SITE-049 | `page` | the Copy button of the setup command (home doors, /start/) |
| `lead_started` | live from SITE-049 | `page` | the first input in the /business/ request form, once per page load |
| `lead_sent` | live from SITE-049 | `page`; `path`: agent, form | the /business/ form after a 201 or 200 answer; the agent prompt's own requests are counted by the Worker's intake, not here |
| `lang_switch` | live from SITE-049 | `page`; `to`: one of the site's locales or `other` | the header's language switch |

## Funnels (FLW-08)

| Funnel | Steps |
| --- | --- |
| Organization | `page_view` home → `video_progress` → `cta_click` target business → `page_view` business → `lead_started` → `lead_sent` |
| Personal | `page_view` home → `cta_click` target start → `page_view` start → `command_copy` |
| Investor | `page_view` home → `cta_click` target investors → `cta_click` target mail |
| Engineer | `page_view` home → `cta_click` target github or setup |

## History

- 2026-11-06: catalogue created with the first seven events (SITE-049).
