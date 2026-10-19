import { getDb, normalizedEvents } from '@/lib/db'
import type { ReportAlignmentCounts } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { reportAlignmentSelection } from './reportAlignmentSelection'

/**
 * Sums the message counts of one raw report by SPF/DKIM alignment.
 */
export async function fetchReportAlignmentCounts(
  rawReportId: number,
): Promise<ReportAlignmentCounts> {
  const [row] = await getDb()
    .select(reportAlignmentSelection)
    .from(normalizedEvents)
    .where(eq(normalizedEvents.rawReportId, rawReportId))

  // Every sum is coalesced to 0, so a row always carries five numbers.
  return (
    row ?? {
      totalMessages: 0,
      spfAlignedCount: 0,
      dkimAlignedCount: 0,
      bothAlignedCount: 0,
      dmarcPassCount: 0,
    }
  )
}
