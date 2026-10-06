-- Where the last snapshot came from: 'cron' (the Worker asked GitHub) or 'push' (the hourly
-- GitHub Actions job sent it, signed). docs/DEPLOYMENT.md#always-current-versions
ALTER TABLE release_snapshot ADD COLUMN source TEXT NOT NULL DEFAULT 'cron';
