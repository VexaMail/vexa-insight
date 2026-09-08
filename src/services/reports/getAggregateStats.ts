import { getAllowedDomainIds } from '@/services/auth'
import type { AggregateStats } from '@/types/reports'
import { queryDomainCount } from './aggregateStats/queryDomainCount'
import { queryRollupSums } from './aggregateStats/queryRollupSums'
import { queryScopedReportCount } from './aggregateStats/queryScopedReportCount'

/**
 * Returns aggregate stats: total domains, reports, emails, and overall pass rate.
 *
 * Domain and report counts stay on their source tables; the email totals come
 * from the daily rollup, which is what keeps dashboard load off the full
 * normalized_events table.
 */
export async function getAggregateStats(
  from?: Date,
  to?: Date,
): Promise<AggregateStats> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) {
    return {
      totalDomains: 0,
      totalReports: 0,
      totalEmails: 0,
      overallPassRate: 0,
    }
  }

  const [totalDomains, totalReports, sums] = await Promise.all([
    queryDomainCount(allowedIds),
    queryScopedReportCount(allowedIds, from, to),
    queryRollupSums(allowedIds, from, to),
  ])

  return {
    totalDomains,
    totalReports,
    totalEmails: sums.total,
    overallPassRate: sums.total > 0 ? (sums.passed / sums.total) * 100 : 0,
  }
}
