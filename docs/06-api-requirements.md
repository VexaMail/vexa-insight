# API Requirements

Stable versioned endpoints (e.g. /api/v1/...): domains list and summary; reports
list (raw + normalized); metrics for charts; top IPs/unauthorized sources; trend
(daily/weekly). API is the single source of truth for the UI.

**Configuration and admin:** GET and PUT `/api/v1/admin/settings`, and POST
trigger-poll, all require the API key (`X-API-Key` or
`Authorization: Bearer <key>`) or an admin session. The GET response carries no
secrets, but it is not public: `requireAdminAuth` runs before it. The same API
key is used for cron-triggered ingest and for saving configuration. POST
`/api/install` completes first-time setup and is guarded by the one-time install
token, which is logged on every boot until installation finishes and is accepted
only from the loopback interface unless `VEXA_ALLOW_REMOTE_INSTALL=1` is set;
after installation it returns 403.
