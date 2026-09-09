import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { parseDmarcXml } from '@/utils/dmarc'
import { eq } from 'drizzle-orm'
import type { BackfillReportCounts } from './BackfillReportCounts'
import { replaceEventDkimResults } from './replaceEventDkimResults'
import { replaceEventPolicyOverrides } from './replaceEventPolicyOverrides'

/**
 * Re-parses one raw report and patches the diagnostic fields of its events.
 * Events are matched by index: the original ingest loop processes records in
 * the same order as the XML, so index alignment is reliable.
 */
export async function backfillReportEvents(
  rawReportId: number,
  eventIds: readonly number[],
): Promise<BackfillReportCounts> {
  const db = getDb()
  const [raw] = await db
    .select({ rawXml: rawReports.rawXml })
    .from(rawReports)
    .where(eq(rawReports.id, rawReportId))
    .limit(1)

  if (!raw?.rawXml) return { processed: 0, skipped: eventIds.length }

  const parsed = parseDmarcXml(Buffer.from(raw.rawXml, 'utf-8'))
  let processed = 0
  let skipped = 0

  // SQLite transactions must be synchronous (better-sqlite3 constraint).
  db.transaction((tx) => {
    for (let i = 0; i < eventIds.length; i++) {
      const eventId = eventIds[i]
      const ev = parsed.events[i]
      if (!ev || eventId == null) {
        skipped++
        continue
      }

      tx.update(normalizedEvents)
        .set({ spfAuthResult: ev.spfAuthResult })
        .where(eq(normalizedEvents.id, eventId))
        .run()
      replaceEventDkimResults(tx, eventId, ev.dkimAuthResults)
      replaceEventPolicyOverrides(tx, eventId, ev.policyOverrides)
      processed++
    }
  })

  return { processed, skipped }
}
