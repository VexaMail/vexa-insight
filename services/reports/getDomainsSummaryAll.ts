import type { DomainsSummaryResponse } from '@/types/reports'
import { getAggregateStats } from './getAggregateStats'
import { getDomains } from './getDomains'
import { getDomainSummary } from './getDomainSummary'

/**
 * Returns all domain summaries plus overall aggregate stats.
 */
export async function getDomainsSummaryAll(
  from?: Date,
  to?: Date,
): Promise<DomainsSummaryResponse> {
  const [domainRows, overall] = await Promise.all([
    getDomains(),
    getAggregateStats(from, to),
  ])
  const domains = await Promise.all(
    domainRows.map((d) => getDomainSummary(d.id, from, to)),
  )
  const summaries = domains.filter((s): s is NonNullable<typeof s> => s != null)
  return { domains: summaries, overall }
}
