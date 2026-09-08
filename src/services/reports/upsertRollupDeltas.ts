import { eventRollupDaily } from '@/lib/db'
import type { ReportTransaction } from '@/types/reports'
import type { computeDailyRollupDeltas } from '@/utils/reports'
import { sql } from 'drizzle-orm'

/** Keeps event_rollup_daily consistent with the events just inserted. */
export function upsertRollupDeltas(
  tx: ReportTransaction,
  domainId: number,
  deltas: ReturnType<typeof computeDailyRollupDeltas>,
): void {
  for (const [day, delta] of deltas) {
    tx.insert(eventRollupDaily)
      .values({
        domainId,
        day,
        totalCount: delta.totalCount,
        passedCount: delta.passedCount,
      })
      .onConflictDoUpdate({
        target: [eventRollupDaily.domainId, eventRollupDaily.day],
        set: {
          totalCount: sql`${eventRollupDaily.totalCount} + ${delta.totalCount}`,
          passedCount: sql`${eventRollupDaily.passedCount} + ${delta.passedCount}`,
        },
      })
      .run()
  }
}
