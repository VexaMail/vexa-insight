import { normalizedEventDkimResults } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { insertEventDkimResults } from './insertEventDkimResults'

/** Rewrites an event's DKIM rows so a re-run does not duplicate them. */
export function replaceEventDkimResults(
  tx: ReportTransaction,
  eventId: number,
  dkimAuthResults: ParseResult['events'][number]['dkimAuthResults'],
): void {
  if (dkimAuthResults.length === 0) return
  tx.delete(normalizedEventDkimResults)
    .where(eq(normalizedEventDkimResults.eventId, eventId))
    .run()
  insertEventDkimResults(tx, eventId, dkimAuthResults)
}
