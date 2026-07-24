import { eventRollupDaily, getDb, normalizedEvents } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import { sql } from 'drizzle-orm'
import type { InsertSeedEventsParams } from './InsertSeedEventsParams'

/**
 * Inserts `eventsPerReport` deterministic normalized_events rows for a single
 * raw report. SPF passes on even index, DKIM passes on multiples of three, and
 * `count` is `(index + 1)` so totals are predictable.
 *
 * Also maintains event_rollup_daily so this test writer keeps the same
 * rollup invariant the production ingest path does; all events in one call
 * share a report end date, so they land in a single day bucket.
 */
export function insertSeedEvents(params: InsertSeedEventsParams): void {
  const db = getDb()
  const {
    rawReportId,
    domainId,
    ipId,
    eventsPerReport,
    beginUnix,
    endUnix,
    now,
  } = params
  let dayTotal = 0
  let dayPassed = 0
  for (let e = 0; e < eventsPerReport; e++) {
    const count = e + 1
    const spfPass = e % 2 === 0
    const dkimPass = e % 3 === 0
    dayTotal += count
    if (spfPass || dkimPass) dayPassed += count
    db.insert(normalizedEvents)
      .values({
        rawReportId,
        domainId,
        ipAddressId: ipId,
        spfResult: spfPass ? 'pass' : 'fail',
        dkimResult: dkimPass ? 'pass' : 'fail',
        spfAuthResult: 'pass',
        spfAligned: true,
        dkimAligned: true,
        disposition: 'none',
        count,
        reportBeginDate: beginUnix,
        reportEndDate: endUnix,
        createdAt: now,
      })
      .run()
  }

  db.insert(eventRollupDaily)
    .values({
      domainId,
      day: Math.floor(endUnix / DAY_SECONDS),
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
