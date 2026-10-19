import { getAllowedDomainNames } from '@/services/auth'
import { listSourceReviews } from '@/services/source-reviews'
import type { IpDetailExtras, IpDetailExtrasParams } from '@/types/ips'
import { getIpDailyTrend } from './getIpDailyTrend'
import { getIpRawRecords } from './getIpRawRecords'

/**
 * The operator's verdicts the caller may see, the daily series of the KPI
 * sparklines and, for the raw data tab only, the parsed report records.
 */
export async function getIpDetailExtras({
  ip,
  dateRange,
  rawReportIds,
}: IpDetailExtrasParams): Promise<IpDetailExtras> {
  const [allowed, reviews, daily, rawRecords] = await Promise.all([
    getAllowedDomainNames(),
    listSourceReviews({ ip }),
    getIpDailyTrend(ip, dateRange),
    rawReportIds ? getIpRawRecords(ip, rawReportIds) : null,
  ])
  return {
    reviews: reviews.filter(
      (review) => allowed === null || allowed.has(review.domainName),
    ),
    daily,
    rawRecords,
  }
}
