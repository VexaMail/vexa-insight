# ADR 0008: Batched ingestion and daily rollups for large-volume data

Date: 2026-07-24

## Status

Accepted

## Context

`better-sqlite3` is synchronous: every query blocks the single Node event loop.
The ingest pipeline wrote progress once per email (a `poll_status` UPSERT plus a
`job_poll_events` INSERT), and resolved source IPs one round trip at a time. On
a mailbox with hundreds of thousands to a million report messages this produced
millions of individual fsync'd transactions, so an ingest ran for many minutes
to hours while the whole server stalled and the UI showed little progress.

Separately, the dashboard aggregates (`getAggregateStats`, `getDomainSummary`,
`getDomainsSummaryAll`) computed `SUM(count)` over the full `normalized_events`
table on every request. `getDomainSummary` loaded every matching row into Node
and summed in JS. Foreign-key columns (`raw_report_id`, `ip_address_id`) were
unindexed, so per-report and per-IP reads were full scans. Aggregate cost grew
linearly with retained data and had no ceiling: the "compute a total" step users
hit could take minutes.

The single-writer SQLite topology (ADR 0003) and the append-only, boot-time,
non-destructive migration policy (ADR 0004) both constrain the solution.

## Decision

- Enable WAL with `synchronous = NORMAL` and a `busy_timeout` on the app
  connection (`src/lib/db/applyConnectionPragmas.ts`). Foreign-key enforcement
  is intentionally left off; the app never enabled it and turning it on would
  change delete/insert ordering across the codebase.
- Coalesce ingest progress: a `poll_status` coalescer flushes at most every ~500
  ms or ~500 events, and `job_poll_events` are buffered and written as multi-row
  inserts. Per-email writes drop from millions to a few thousand.
- Resolve source IPs in a set-based batch (`upsertIpsBatch`) instead of one
  SELECT + upsert per IP.
- Maintain `event_rollup_daily` (per domain, per UTC day: `total_count`,
  `passed_count`) incrementally inside the ingest transaction. The dashboard
  aggregates read the rollup instead of scanning `normalized_events`. Pass is
  defined as SPF pass OR DKIM pass everywhere; the day bucket is
  `floor(reportEndDate / 86400)`, shared through
  `src/utils/dates/daySeconds.ts`.
- Add indexes on `normalized_events(raw_report_id)`, `(ip_address_id)`, and a
  covering `(domain_id, report_end_date, count)` for scoped sums.
- Backfill is a full, idempotent recompute (`pnpm run backfill:rollup`), run out
  of band rather than inside a boot migration, so large installs do not stall at
  startup. Direct-insert paths (demo seed, test fixtures) keep the rollup
  consistent.

## Consequences

- Large ingests stream with live progress instead of stalling; the dashboard
  "total" is O(rows-per-domain-per-day) instead of a full-table scan.
- The rollup is derived state: any code that writes `normalized_events` must
  update `event_rollup_daily` or trigger a rebuild. The invariant is covered by
  an ingest-vs-rollup consistency test.
- Date filtering on the rollup is at day granularity. DMARC aggregate reports
  are day-aligned, so this matches the prior per-second filter in practice.
- Existing installs must run the backfill once after upgrading; until then
  dashboard totals read a rollup that lags the events table.

## Alternatives considered

- Materialized view / triggers: rejected; SQLite triggers on the hot insert path
  add per-row overhead and hide logic from the app layer.
- Computing the total up front for progress: rejected; that is the redundant
  full scan being removed. The unused `getImapTotalCount` was flagged for
  cleanup rather than wired into the job, and deleted on 2026-07-25.
- Backfill inside a boot migration: rejected; recomputing millions of rows at
  startup violates the "migrations are cheap and safe at boot" expectation of
  ADR 0004.
