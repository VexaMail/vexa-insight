import type { ReportStats } from '@/types/reports'
import { percentOf } from '@/utils/reports'
import { countSourcesRequiringReview } from './countSourcesRequiringReview'
import { fetchReportAlignmentCounts } from './fetchReportAlignmentCounts'

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
  const counts = await fetchReportAlignmentCounts(rawReportId)
  const sourcesRequiringReviewCount =
    await countSourcesRequiringReview(rawReportId)

  return {
    ...counts,
    sourcesRequiringReviewCount,
    complianceRate: percentOf(counts.bothAlignedCount, counts.totalMessages),
    spfAlignedRate: percentOf(counts.spfAlignedCount, counts.totalMessages),
    dkimAlignedRate: percentOf(counts.dkimAlignedCount, counts.totalMessages),
  }
}
