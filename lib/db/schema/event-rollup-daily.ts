import {
  index,
  integer,
  primaryKey,
  sqliteTable,
} from 'drizzle-orm/sqlite-core'
import { domains } from './domain'

/**
 * Pre-aggregated per-domain, per-day message totals.
 *
 * `day` is `floor(reportEndDate / 86400)` (UTC day index). DMARC aggregate
 * reports are day-aligned, so this loses no meaningful precision while turning
 * the dashboard's SUM(count) over millions of normalized_events into a scan of
 * a few rows per domain per day. `passedCount` uses the same pass definition as
 * the live aggregates: SPF pass OR DKIM pass.
 *
 * Kept consistent with normalized_events by incremental upserts at ingest and a
 * full idempotent recompute in scripts/backfill-rollup.ts.
 */
export const eventRollupDaily = sqliteTable(
  'event_rollup_daily',
  {
    domainId: integer('domain_id')
      .notNull()
      .references(() => domains.id),
    day: integer('day').notNull(),
    totalCount: integer('total_count').notNull().default(0),
    passedCount: integer('passed_count').notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.domainId, table.day] }),
    index('rollup_day_idx').on(table.day),
  ],
)
