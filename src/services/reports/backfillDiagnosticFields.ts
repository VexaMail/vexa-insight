import { getDb, normalizedEvents } from '@/lib/db'
import { isNull } from 'drizzle-orm'
import { backfillReportEvents } from './backfillReportEvents'
import type { BackfillResult } from './BackfillResult'
import { groupEventIdsByReport } from './groupEventIdsByReport'

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

  let processed = 0
  let skipped = 0
  let errors = 0

  for (const [rawReportId, eventIds] of groupEventIdsByReport(staleEvents)) {
    try {
      const counts = await backfillReportEvents(rawReportId, eventIds)
      processed += counts.processed
      skipped += counts.skipped
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
