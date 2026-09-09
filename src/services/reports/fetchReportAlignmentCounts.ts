import { getDb, normalizedEvents } from '@/lib/db'
import type { ReportAlignmentCounts } from '@/types/reports'
import { eq, sql } from 'drizzle-orm'

/**
 * Sums the message counts of one raw report by SPF/DKIM alignment.
 */
export async function fetchReportAlignmentCounts(
  rawReportId: number,
): Promise<ReportAlignmentCounts> {
  const [row] = await getDb()
    .select({
      totalMessages: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
      spfAlignedCount: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      dkimAlignedCount: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      bothAlignedCount: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 and ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
    })
    .from(normalizedEvents)
    .where(eq(normalizedEvents.rawReportId, rawReportId))

  return {
    totalMessages: row?.totalMessages ?? 0,
    spfAlignedCount: row?.spfAlignedCount ?? 0,
    dkimAlignedCount: row?.dkimAlignedCount ?? 0,
    bothAlignedCount: row?.bothAlignedCount ?? 0,
  }
}
