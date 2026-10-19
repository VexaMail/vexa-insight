import { getDb, normalizedEvents } from '@/lib/db'
import type { ReportRow } from '@/types/reports'
import { inArray, sql } from 'drizzle-orm'

/**
 * Adds each report's DMARC message totals. A message passes DMARC when SPF or
 * DKIM is aligned, so it fails only when neither is; it passes partially when
 * exactly one is, which the report page counts as requiring review.
 */
export async function attachDmarcOutcome(
  reports: ReportRow[],
): Promise<ReportRow[]> {
  if (reports.length === 0) return reports

  const rows = await getDb()
    .select({
      rawReportId: normalizedEvents.rawReportId,
      totalMessages: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
      failingMessages: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAligned} = 0 and ${normalizedEvents.dkimAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      partiallyAlignedMessages: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAligned} <> ${normalizedEvents.dkimAligned} then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
    })
    .from(normalizedEvents)
    .where(
      inArray(
        normalizedEvents.rawReportId,
        reports.map((r) => r.id),
      ),
    )
    .groupBy(normalizedEvents.rawReportId)

  const byReport = new Map(rows.map((row) => [row.rawReportId, row]))

  return reports.map((r) => {
    const row = byReport.get(r.id)
    return {
      ...r,
      dmarcOutcome: {
        totalMessages: row?.totalMessages ?? 0,
        failingMessages: row?.failingMessages ?? 0,
        partiallyAlignedMessages: row?.partiallyAlignedMessages ?? 0,
      },
    }
  })
}
