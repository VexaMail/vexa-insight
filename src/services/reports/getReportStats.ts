import type { ReportStats } from '@/types/reports'
import { computeReportStats } from '@/utils/reports'
import { countSourcesRequiringReview } from './countSourcesRequiringReview'
import { fetchReportAlignmentCounts } from './fetchReportAlignmentCounts'

/**
 * Returns authentication statistics scoped to a single raw report.
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

  return computeReportStats(counts, sourcesRequiringReviewCount)
}
