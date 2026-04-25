# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-04-26

### Added

- Initial public open-source release of Vexa Mail Insight.
- IMAP ingestion of DMARC aggregate reports (RUA) with `.zip` and `.gz` support.
- Idempotent processing keyed on `report_id`.
- Three-layer data model: `RawReport`, `NormalizedEvent`, optional `AggregatedMetric`.
- Drizzle ORM with SQLite default; PostgreSQL/MySQL via `DATABASE_URL`.
- Dashboard with KPI cards, authentication trends, SPF/DKIM breakdown,
  disposition metrics, top sending IPs, and ingestion health.
- Domains and Reports drill-down views.
- Settings UI for project name, API key, IMAP accounts, and ingestion tuning.
- First-run web installer at `/install` with superadmin creation.
- CLI recovery script (`scripts/recovery.ts`) for password reset and admin creation.
- In-process scheduler (node-cron) plus external trigger via `POST /api/v1/admin/trigger-poll`.
- Docker and `docker-compose` support.

### Security

- Apache 2.0 license with explicit patent grant.
- `/api/v1/admin/*` protected by `SECRET_KEY` (HTTP header `X-API-Key` or `Authorization: Bearer`).
- `/install` permanently locked after the first user exists.

[Unreleased]: https://github.com/VexaMail/vexa-insight-dashboard/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/VexaMail/vexa-insight-dashboard/releases/tag/v0.1.0
