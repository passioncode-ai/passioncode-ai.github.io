-- passioncode.ai Worker storage (D1 `passioncode-site`). docs/DEPLOYMENT.md#storage
-- The release snapshot the pages and downloads read, refreshed by the cron.
CREATE TABLE release_snapshot (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  errors TEXT NOT NULL DEFAULT '[]'
);
-- GitHub ETags and bodies, so an unchanged release list costs a 304, not a rate-limit unit.
CREATE TABLE release_cache (
  repository TEXT PRIMARY KEY,
  etag TEXT,
  body TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);
-- Commercial enquiries: written before anything is sent, delivered by channel with retries.
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  payload_hash TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL,
  next_attempt_at TEXT NOT NULL,
  notify_status TEXT NOT NULL DEFAULT 'pending' CHECK (notify_status IN ('pending', 'done', 'failed', 'skipped')),
  notify_attempts INTEGER NOT NULL DEFAULT 0,
  notify_error TEXT,
  notify_at TEXT,
  confirm_status TEXT NOT NULL DEFAULT 'pending' CHECK (confirm_status IN ('pending', 'done', 'failed', 'skipped')),
  confirm_attempts INTEGER NOT NULL DEFAULT 0,
  confirm_error TEXT,
  confirm_at TEXT,
  forward_status TEXT NOT NULL DEFAULT 'pending' CHECK (forward_status IN ('pending', 'done', 'failed', 'skipped')),
  forward_attempts INTEGER NOT NULL DEFAULT 0,
  forward_error TEXT,
  forward_at TEXT
);
CREATE INDEX leads_due ON leads (next_attempt_at);
CREATE INDEX leads_email ON leads (email, confirm_status, confirm_at);
