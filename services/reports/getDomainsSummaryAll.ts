import { domains, getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { DomainsSummaryResponse, DomainSummary } from '@/types/reports'
import { and, eq, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'
import { getAggregateStats } from './getAggregateStats'

/**
 * Returns all domain summaries plus overall aggregate stats.
 *
 * Performs a single GROUP BY query over normalized_events joined with domains
 * (instead of N+1 per-domain queries). Domains with no events are still
 * included with zero counts.
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

  const conditions = [...getDateRangeConditions(from, to)]
  if (allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }

  const aggregateQuery = db
    .select({
      domainId: domains.id,
      domainName: domains.name,
      totalMessages: sql<number>`coalesce(sum(${normalizedEvents.count}), 0)`,
      passedCount: sql<number>`coalesce(sum(case when ${normalizedEvents.spfResult} = 'pass' or ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end), 0)`,
    })
    .from(domains)
    .leftJoin(
      normalizedEvents,
      and(eq(normalizedEvents.domainId, domains.id), ...conditions),
    )
    .groupBy(domains.id, domains.name)

  if (allowedIds !== null) {
    aggregateQuery.where(inArray(domains.id, allowedIds))
  }

  const [rows, overall] = await Promise.all([
    aggregateQuery,
    getAggregateStats(from, to),
  ])

  const summaries: DomainSummary[] = rows.map((row) => {
    const total = Number(row.totalMessages ?? 0)
    const passed = Number(row.passedCount ?? 0)
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
