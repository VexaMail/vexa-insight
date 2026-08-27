import { domains, eventRollupDaily, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { DomainsSummaryResponse, DomainSummary } from '@/types/reports'
import { and, eq, inArray, sql } from 'drizzle-orm'
import { getRollupDayConditions } from './formatters/rollupDayConditions'
import { getAggregateStats } from './getAggregateStats'

/**
 * Returns all domain summaries plus overall aggregate stats.
 *
 * Single GROUP BY over domains left-joined with event_rollup_daily (instead of
 * scanning normalized_events), so domains with no events still appear with zero
 * counts while the totals come from the pre-aggregated rollup.
 */
export async function getDomainsSummaryAll(
  from?: Date,
  to?: Date,
): Promise<DomainsSummaryResponse> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    const overall = await getAggregateStats(from, to)
    return { domains: [], overall }
  }

  const joinConditions = [
    eq(eventRollupDaily.domainId, domains.id),
    ...getRollupDayConditions(from, to),
  ]

  const aggregateQuery = db
    .select({
      domainId: domains.id,
      domainName: domains.name,
      totalMessages: sql<number>`coalesce(sum(${eventRollupDaily.totalCount}), 0)`,
      passedCount: sql<number>`coalesce(sum(${eventRollupDaily.passedCount}), 0)`,
    })
    .from(domains)
    .leftJoin(eventRollupDaily, and(...joinConditions))
    .groupBy(domains.id, domains.name)

  if (allowedIds !== null) {
    aggregateQuery.where(inArray(domains.id, allowedIds))
  }

  const [rows, overall] = await Promise.all([
    aggregateQuery,
    getAggregateStats(from, to),
  ])

  const summaries: DomainSummary[] = rows.map((row) => {
    const total = row.totalMessages
    const passed = row.passedCount
    return {
      domainId: row.domainId,
      domainName: row.domainName,
      totalMessages: total,
      passedCount: passed,
      failedCount: total - passed,
      passRatePercent: total > 0 ? (passed / total) * 100 : 0,
    }
  })

  return { domains: summaries, overall }
}
