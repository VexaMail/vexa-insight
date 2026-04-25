# Vexa Mail Insight

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Node](https://img.shields.io/badge/node-%E2%89%A522-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Vexa Mail Insight is an open-source Email Authentication Observability Platform built with Next.js and TypeScript. It transforms raw DMARC aggregate reports into structured intelligence, providing modern dashboards, analytics, and actionable insights for domain protection and deliverability monitoring.

This project is designed to be enterprise-friendly, self-hostable, SQLite-first (zero-friction install), database-agnostic (PostgreSQL/MySQL ready), and extensible beyond DMARC.

**Highlights:**

- IMAP ingestion of DMARC aggregate reports (RUA) with support for .zip and .gz compressed XML
- Idempotent processing and structured normalization into queryable records
- SQLite by default; no extra setup required
- Optional PostgreSQL or MySQL via a single environment variable
- Dashboard with domain and time-range filtering, top sending IPs, authentication pass/fail trends, policy disposition breakdown, and ingestion health visibility

---

## Why Vexa Mail Insight?

DMARC aggregate reports are difficult to consume: they arrive as XML, often inside compressed email attachments. Most teams rely on third-party email digests and lose direct access to the underlying data. There is a gap between raw report data and actionable intelligence. Organizations need domain-level visibility, trend analysis, and the ability to answer questions about who is sending mail for their domains and how authentication is performing.

Vexa Mail Insight positions itself as the observability layer for email authentication infrastructure: ingest, normalize, store, and expose the same data through a clear API and dashboard so that infrastructure and security teams can monitor and act on it.

---

## Core Features (v1)

**Ingestion**

- IMAP polling of DMARC aggregate reports (RUA) from a dedicated mailbox
- Support for .zip and .gz compressed XML attachments
- Idempotent processing: each report is identified by `report_id`; duplicates are skipped
- Structured normalization: raw XML is parsed into `RawReport` and then into `NormalizedEvent` records (domain, source IP, SPF/DKIM results, alignment, disposition, counts, report window)

**Persistence**

- SQLite default: set `DATABASE_URL=file:./data/vexa.db` (or leave default); no additional setup
- PostgreSQL or MySQL: change `DATABASE_URL` to your connection string and run migrations; no application code changes

**Dashboard and API**

- Overview dashboard: KPI cards, trend chart, SPF/DKIM breakdown, disposition metrics, volume by reporting org, ingestion (poll) status
- Domain list and domain detail pages with source IP analysis and report drill-down
- Time-range and domain filtering
- Top sending IP analysis and authentication pass/fail trends
- Policy disposition breakdown
- Ingestion health visibility (last poll, running status)
- Settings page configures project name, API key, IMAP accounts, and ingestion (interval, days back); stored in the database or seeded from environment variables

---

## Architecture Overview

**Application layers**

- **Next.js App Router:** UI (dashboard, domains, reports, settings, upload) and API routes under `/api/v1/`
- **Background job runner:** In-Node scheduler (node-cron) for IMAP fetch and ingest; optional external trigger via `POST /api/v1/admin/trigger-poll` with API key (X-API-Key or Bearer)
- **DMARC ingestion pipeline:** Fetch attachments from IMAP, parse DMARC XML (including from .zip/.gz), normalize, and write to the database with idempotency
- **Database abstraction:** Drizzle ORM with SQLite by default and support for other drivers via `DATABASE_URL`

**Data model (three layers)**

- **RawReport:** Stores the original XML payload and metadata (report_id, org name, date range, source email, ingested_at). Used for auditability and debugging.
- **NormalizedEvent:** Per-record structured data: domain, source IP, SPF/DKIM result and alignment, disposition, count, report window. Used for queries, dashboards, and analytics.
- **AggregatedMetric (optional/future):** Precomputed metrics for dashboards; if not present, the application computes metrics from NormalizedEvent via API queries.

This separation keeps raw data auditable, allows flexible querying and reporting on normalized data, and leaves room for future materialized aggregates without changing the ingestion pipeline.

---

## Tech Stack

- **Next.js** 16 (App Router)
- **React** 19
- **TypeScript** 5
- **Drizzle ORM** (SQLite default; PostgreSQL/MySQL via connection string)
- **Tailwind CSS** 4
- **Zod** (validation)
- **node-cron** (in-process scheduler)
- **Docker**-ready (see Docker section)

Migrations are generated and applied with Drizzle Kit: `pnpm run db:generate`, `pnpm run db:migrate`.

---

## Installation Guide

**Requirements:** Node.js 22+, pnpm (recommended).

**Quick start (SQLite default, no .env required)**

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/VexaMail/vexa-insight-dashboard.git
   cd vexa-insight-dashboard
   pnpm install
   ```

2. Start the app and use the web installer:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). If the app is not yet installed, you will be redirected to the initial setup page. No `.env` is required for a quick start; the database is created at `data/vexa.db` by default. Complete the form (project name, API key, optional IMAP account, ingestion options) and submit to finish installation.

3. Optional: configure environment variables (e.g. for production or to override the database path):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` if needed. `DATABASE_URL` is optional (default `file:./data/vexa.db`). Other settings can be managed in the Settings UI after installation.

**Environment variables**

| Variable                     | Required               | Description                                                                                                  |
| ---------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`               | No                     | Default `file:./data/vexa.db` for SQLite. Set for PostgreSQL/MySQL or a custom path.                         |
| `SECRET_KEY`                 | No (set via installer) | Min 32 characters. API key for trigger poll and crons; can be set in the web installer or later in Settings. |
| `IMAP_SERVER`                | No                     | IMAP host. Can also be set in the web installer or Settings UI.                                              |
| `IMAP_PORT`                  | No                     | Default `993`.                                                                                               |
| `IMAP_USERNAME`              | No                     | IMAP username.                                                                                               |
| `IMAP_PASSWORD`              | No                     | IMAP password.                                                                                               |
| `INGESTION_INTERVAL_MINUTES` | No                     | Scheduler interval in minutes (default `60`).                                                                |
| `INGESTION_DAYS_BACK`        | No                     | Days of mailbox history to fetch (default `7`).                                                              |
| `PROJECT_NAME`               | No                     | Default `Vexa Mail Insight`.                                                                                 |
| `ENVIRONMENT`                | No                     | `development`, `staging`, or `production`.                                                                   |

For quick start, no `.env` is required: run the app and use the web installer; the database is created at `data/vexa.db` by default. Optional variables can be set in `.env` or overridden later in the Settings panel (stored in the database).

---

## Installation & Recovery

Vexa Mail Insight requires an initial Bootstrap process to secure your instance.

### 1. First-Time Install (Bootstrap)

When you start the application for the first time with an empty database, you will be forcibly redirected to `/install`.

- **Superadmin Creation**: You must provide an Admin Email and Password. This creates the first user in the system.
- **Lockout**: Once at least one user exists in the database, the `/install` route is permanently locked and inaccessible.

### 2. Password Recovery (OSS-Friendly)

In open-source deployments where SMTP email infrastructure might not be configured, **password recovery is done via the CLI** on the server.
If an admin forgets their password, they must run the recovery script.

### 3. CLI Recovery Commands

We provide a dedicated CLI script for recovering access or managing users directly from the server console.

Run these commands from the root of the project:

**Create a new Admin user**

```bash
npx tsx scripts/recovery.ts create-admin newadmin@example.com MySecurePassword123!
```

**Reset a user's password**

```bash
npx tsx scripts/recovery.ts reset-password existingadmin@example.com NewPwd456!
```

**Promote a standard user to Admin**

```bash
npx tsx scripts/recovery.ts promote-user someuser@example.com
```

**Hard Reset (USE WITH CAUTION)**
_Deletes all users from the database, which unlocks the `/install` route again._

```bash
npx tsx scripts/recovery.ts hard-reset --confirm
```

---

## Background Jobs

**IMAP polling:** When IMAP settings are configured (via env or Settings UI), the application starts an in-Node scheduler on server startup. It runs the ingest job at a configurable interval (default every 60 minutes), fetching new DMARC reports from the mailbox, parsing them, and persisting raw and normalized data.

**Triggering ingestion**

- **Internal:** The scheduler runs automatically when the server is up and IMAP is configured.
- **External cron or script:** Call the trigger-poll endpoint with your API key:

  ```bash
  curl -X POST -H "X-API-Key: YOUR_API_KEY" https://your-host/api/v1/admin/trigger-poll
  ```

  Or use `Authorization: Bearer YOUR_API_KEY`. Use the same API key as in Settings. Do not expose this endpoint publicly; protect it with network or application-level access control.

- **Manual:** Use the same endpoint from the UI (e.g. Settings or dashboard) or any HTTP client.

---

## Switching to PostgreSQL or MySQL

1. Set `DATABASE_URL` in `.env` to your PostgreSQL or MySQL connection string.
2. Run migrations: `pnpm run db:migrate`.

No application code changes are required. This path is suitable for production scaling and multi-process deployments.

---

## Dashboard Overview

- **Overview:** KPI cards, authentication trend chart, SPF/DKIM breakdown, disposition metrics, volume by reporting organization, and ingestion (poll) status with optional date-range filter.
- **Domains:** List of domains with summary data; drill into a domain for source IPs, per-domain stats, and linked reports.
- **Reports:** List and single-report view; optional upload flow for manual report ingestion.
- **Settings:** Configure project name, API key, IMAP accounts, ingestion interval and days back, and optional advanced options (stored in the database).

The dashboard consumes the public API (`/api/v1/...`); it does not access the database directly.

---

## Roadmap

- **Phase 1 (current):** DMARC aggregate ingestion, normalization pipeline, dashboard analytics, SQLite default, optional PostgreSQL/MySQL.
- **Phase 2:** Forensic reports (RUF), alerting, unauthorized source detection.
- **Phase 3:** Reputation scoring, threat intelligence enrichment, anomaly detection.
- **Phase 4:** Full Email Authentication Control Center.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, code style, and PR workflow. In short: fork and open a PR; run `pnpm run check` (type-check, format, lint) before submitting; keep route handlers thin and logic in services; use TypeScript and place types in `types/<area>/`; follow existing patterns (one export per file, Drizzle migrations for schema changes).

---

## Security Notice

- Store IMAP credentials securely (environment variables or Settings UI); do not commit `.env`.
- Do not expose ingestion or admin endpoints publicly. Protect `/api/v1/admin/*` with the API key (SECRET_KEY) and run the application behind authentication in production.
- SQLite is recommended for local development. For production, consider PostgreSQL or MySQL and appropriate file and network security.

---

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Commercial use is permitted. There are no copyleft restrictions. The license includes a patent grant.

---

## Vision

Vexa Mail Insight aims to become the open standard for email authentication observability. We welcome contributors, security researchers, and infrastructure teams to use, extend, and improve it.
