import { eventRollupDaily, getDb } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import { sql } from 'drizzle-orm'

/**
 * Recomputes event_rollup_daily from scratch and returns the number of rows
 * written. Idempotent: it clears the table and rebuilds every (domain, day)
 * bucket from normalized_events in one transaction, so running it repeatedly
 * converges to the same result.
 *
 * `report_end_date / 86400` is injected as a raw integer literal so SQLite
 * performs integer division; a float divisor would fragment a single day into
 * many groups and collide on the (domain_id, day) primary key. The day formula
 * mirrors computeDailyRollupDeltas so backfilled and incrementally-ingested
 * rows agree. Run while ingestion is idle (single-writer SQLite).
 */
export async function rebuildEventRollup(): Promise<number> {
  const db = getDb()
  const dayExpr = sql.raw(`report_end_date / ${String(DAY_SECONDS)}`)

  db.transaction((tx) => {
    tx.run(sql`DELETE FROM event_rollup_daily`)
    tx.run(sql`
      INSERT INTO event_rollup_daily (domain_id, day, total_count, passed_count)
      SELECT domain_id, ${dayExpr}, sum(count),
        sum(case when spf_result = 'pass' or dkim_result = 'pass' then count else 0 end)
      FROM normalized_events
      GROUP BY domain_id, ${dayExpr}
    `)
  })

  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(eventRollupDaily)
  return row?.count ?? 0
}
