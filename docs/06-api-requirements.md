# API Requirements

Stable versioned endpoints (e.g. /api/v1/...): domains list and summary; reports
list (raw + normalized); metrics for charts; top IPs/unauthorized sources; trend
(daily/weekly). API is the single source of truth for the UI.

**Configuration and admin:** GET `/api/v1/admin/settings` is public (read-only;
returns project, IMAP accounts list, ingestion options; no secrets). PUT
`/api/v1/admin/settings` and POST trigger-poll require the API key (`X-API-Key`
or `Authorization: Bearer <key>`). The same API key is used for cron-triggered
ingest and for saving configuration. POST `/api/install` completes first-time
setup (no auth when not yet installed); after installation it returns 403.
