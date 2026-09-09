import { eventRollupDaily, getDb } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import { sql } from 'drizzle-orm'

/**
 * Maintains the derived rollup inline so the seed does not depend on the
 * reports barrel (which would pull top-level-await modules into the tsx
 * seed script). All events of a day share one report end date -> one bucket.
 */
export function upsertDemoRollup(
  domainId: number,
  reportEndDate: number,
  dayTotal: number,
  dayPassed: number,
): void {
  getDb()
    .insert(eventRollupDaily)
    .values({
      domainId,
      day: Math.floor(reportEndDate / DAY_SECONDS),
      totalCount: dayTotal,
      passedCount: dayPassed,
    })
    .onConflictDoUpdate({
      target: [eventRollupDaily.domainId, eventRollupDaily.day],
      set: {
        totalCount: sql`${eventRollupDaily.totalCount} + ${dayTotal}`,
        passedCount: sql`${eventRollupDaily.passedCount} + ${dayPassed}`,
      },
    })
    .run()
}
