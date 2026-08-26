# Data Model

Never couple UI to raw DMARC XML. Three layers: RawReport (original XML
payload + metadata for audit/debug); NormalizedEvent (domain, source IP,
SPF/DKIM results, alignment, disposition, counts, report window);
AggregatedMetric (optional in v1, precomputed metrics for dashboards; if not
implemented, compute via queries). Support efficient time-range queries by
domain, source IP, disposition, SPF/DKIM alignment, reporting org.

**Configuration layer:** `app_settings` (single row) holds project name, API
path, ingestion interval/days, API key (secret), CORS, and environment.
`imap_accounts` holds one or more IMAP accounts (label, server, port, username,
password, sort order) used by the installer and Settings and by the ingest job
to fetch DMARC reports from multiple mailboxes.
