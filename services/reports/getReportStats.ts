import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import type { ReportStats } from '@/types/reports'
import { eq, sql } from 'drizzle-orm'

/**
 * Returns authentication statistics scoped to a single raw report.
 *
 * complianceRate = bothAlignedCount / totalMessages (strict dual-alignment).
 * All rates pre-computed server-side as percentages (0-100).
 *
 * Uses the same base predicate (rawReportId = ?) as getReportSources
 * to guarantee aggregate/row-level consistency.
 */
export async function getReportStats(
  rawReportId: number,
): Promise<ReportStats> {
  const db = getDb()

  const [row] = await db
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

  const [sourcesRow] = await db
    .select({
      sourcesRequiringReviewCount: sql<number>`
        cast(count(distinct ${ipAddresses.ip}) as integer)
      `,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(
      sql`${normalizedEvents.rawReportId} = ${rawReportId}
        and (${normalizedEvents.spfAligned} = 0 or ${normalizedEvents.dkimAligned} = 0)`,
    )

  const total = row?.totalMessages ?? 0
  const spfAligned = row?.spfAlignedCount ?? 0
  const dkimAligned = row?.dkimAlignedCount ?? 0
  const bothAligned = row?.bothAlignedCount ?? 0
  const sourcesReview = sourcesRow?.sourcesRequiringReviewCount ?? 0

  return {
    totalMessages: total,
    spfAlignedCount: spfAligned,
    dkimAlignedCount: dkimAligned,
    bothAlignedCount: bothAligned,
    sourcesRequiringReviewCount: sourcesReview,
    complianceRate: total > 0 ? Math.round((bothAligned / total) * 100) : 0,
    spfAlignedRate: total > 0 ? Math.round((spfAligned / total) * 100) : 0,
    dkimAlignedRate: total > 0 ? Math.round((dkimAligned / total) * 100) : 0,
  }
}
