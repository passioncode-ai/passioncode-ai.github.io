-- Spent form-token nonces: a /business/ page load sends one request (docs/DEPLOYMENT.md#commercial-enquiries).
CREATE TABLE form_tokens (
  nonce TEXT PRIMARY KEY,
  used_at TEXT NOT NULL
);
CREATE INDEX form_tokens_used ON form_tokens (used_at);
