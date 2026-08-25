# Dashboard Requirements

**Pages:** Overview (global KPIs), Domain detail, Sources/IPs, Reports ingestion health (job status, failures, last run), Policy impact (none/quarantine/reject distribution). **Install** (`/install`): first-time setup wizard when the app is not yet installed (project name, API key with generate, one or more IMAP accounts, optional ingestion defaults). **Settings** (`/settings`): configure project name, API key (with generate and optional new key), multiple IMAP accounts (add/remove/test), ingestion interval and days back, and advanced options (CORS, environment); same page shows poll status and trigger-poll form (plus an explicit full-mailbox rescan, which ignores the configured window), and recent job runs.

**Charts:** Pass vs Fail trend over time; SPF vs DKIM alignment breakdown; top source IPs and unauthorized sources; disposition distribution; volume per reporting org.

**UX:** observability-style layout; fast filtering (domain selector, date range); clear actionable callouts (e.g. new unauthorized IP spike). Settings and Install use clear section labels and short help text so configuration is self-explanatory.
