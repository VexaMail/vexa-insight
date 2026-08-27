import {
  getDb,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { parseDmarcXml } from '@/utils/dmarc'
import { eq, isNull } from 'drizzle-orm'
import type { BackfillResult } from './BackfillResult'

/**
 * Backfills spfAuthResult, dkimAuthResults and policyOverrides
 * for all normalized_events that were ingested before the new pipeline.
 *
 * Safe to run multiple times — it only processes events where
 * spfAuthResult IS NULL (i.e. pre-new-pipeline rows).
 */
export async function backfillDiagnosticFields(): Promise<BackfillResult> {
  const db = getDb()

  // Find all normalized_events that lack the new diagnostic fields
  const staleEvents = await db
    .select({
      eventId: normalizedEvents.id,
      rawReportId: normalizedEvents.rawReportId,
    })
    .from(normalizedEvents)
    .where(isNull(normalizedEvents.spfAuthResult))

  if (staleEvents.length === 0) {
    return { processed: 0, skipped: 0, errors: 0 }
  }

  // Group by rawReportId to avoid re-parsing the same XML multiple times
  const reportMap = new Map<number, number[]>()
  for (const { eventId, rawReportId } of staleEvents) {
    if (!reportMap.has(rawReportId)) reportMap.set(rawReportId, [])
    const group = reportMap.get(rawReportId)
    if (group) group.push(eventId)
  }

  let processed = 0
  let skipped = 0
  let errors = 0

  for (const [rawReportId, eventIds] of reportMap) {
    try {
      const [raw] = await db
        .select({ rawXml: rawReports.rawXml })
        .from(rawReports)
        .where(eq(rawReports.id, rawReportId))
        .limit(1)

      if (!raw?.rawXml) {
        skipped += eventIds.length
        continue
      }

      const parsed = parseDmarcXml(Buffer.from(raw.rawXml, 'utf-8'))

      // Match events by index — the original ingest loop processes records in
      // the same order as the XML, so index alignment is reliable.
      // SQLite transactions must be synchronous (better-sqlite3 constraint).
      db.transaction((tx) => {
        for (let i = 0; i < eventIds.length; i++) {
          const eventId = eventIds[i]
          const ev = parsed.events[i]
          if (!ev || eventId == null) {
            skipped++
            continue
          }

          // Patch the spfAuthResult on the existing normalized_event row
          tx.update(normalizedEvents)
            .set({ spfAuthResult: ev.spfAuthResult })
            .where(eq(normalizedEvents.id, eventId))
            .run()

          // Insert DKIM results (skip if already exist)
          if (ev.dkimAuthResults.length > 0) {
            // Delete stale rows first to avoid duplicates on re-run
            tx.delete(normalizedEventDkimResults)
              .where(eq(normalizedEventDkimResults.eventId, eventId))
              .run()

            tx.insert(normalizedEventDkimResults)
              .values(
                ev.dkimAuthResults.map((dkim) => ({
                  eventId,
                  domain: dkim.domain,
                  selector: dkim.selector,
                  result: dkim.result,
                  isAligned: dkim.isAligned,
                })),
              )
              .run()
          }

          // Insert policy overrides
          if (ev.policyOverrides.length > 0) {
            tx.delete(normalizedEventPolicyOverrides)
              .where(eq(normalizedEventPolicyOverrides.eventId, eventId))
              .run()

            tx.insert(normalizedEventPolicyOverrides)
              .values(
                ev.policyOverrides.map((override) => ({
                  eventId,
                  type: override.type,
                  comment: override.comment,
                })),
              )
              .run()
          }

          processed++
        }
      })
    } catch (err) {
      console.error(
        `[backfill] Error processing rawReportId=${String(rawReportId)}:`,
        err,
      )
      errors += eventIds.length
    }
  }

  return { processed, skipped, errors }
}
