import { getDb, normalizedEvents } from '@/lib/db'
import type { InsertSeedEventsParams } from './InsertSeedEventsParams'

/**
 * Inserts `eventsPerReport` deterministic normalized_events rows for a single
 * raw report. SPF passes on even index, DKIM passes on multiples of three, and
 * `count` is `(index + 1)` so totals are predictable.
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
  for (let e = 0; e < eventsPerReport; e++) {
    db.insert(normalizedEvents)
      .values({
        rawReportId,
        domainId,
        ipAddressId: ipId,
        spfResult: e % 2 === 0 ? 'pass' : 'fail',
        dkimResult: e % 3 === 0 ? 'pass' : 'fail',
        spfAuthResult: 'pass',
        spfAligned: true,
        dkimAligned: true,
        disposition: 'none',
        count: e + 1,
        reportBeginDate: beginUnix,
        reportEndDate: endUnix,
        createdAt: now,
      })
      .run()
  }
}
