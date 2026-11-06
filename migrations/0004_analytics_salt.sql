-- SITE-049: the site's analytics salt (docs/tasks/2026-11-06-ai-native-org-design.md §7).
-- One random salt per UTC day; the Worker makes a visitor-day id from it and the request's IP and User-Agent, and the
-- cron deletes every salt older than today, so yesterday's ids cannot be made again or linked to today's.
CREATE TABLE IF NOT EXISTS analytics_salts (
  day TEXT PRIMARY KEY,
  salt TEXT NOT NULL
);
