import { domains, eventRollupDaily, getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { AggregateStats } from '@/types/reports'
import { and, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'
import { getRollupDayConditions } from './formatters/rollupDayConditions'

/**
 * Returns aggregate stats: total domains, reports, emails, and overall pass rate.
 *
 * Email totals and pass rate come from event_rollup_daily (a few rows per
 * domain per day) instead of SUM over the full normalized_events table, which
 * grew unbounded and dominated dashboard load time. Domain and report counts
 * stay on their source tables; the report count is scoped in SQL.
 */
export async function getAggregateStats(
  from?: Date,
  to?: Date,
): Promise<AggregateStats> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return {
      totalDomains: 0,
      totalReports: 0,
      totalEmails: 0,
      overallPassRate: 0,
    }
  }

  const domainConditions =
    allowedIds !== null ? [inArray(domains.id, allowedIds)] : []
  const reportConditions = [
    ...(allowedIds !== null
      ? [inArray(normalizedEvents.domainId, allowedIds)]
      : []),
    ...getDateRangeConditions(from, to),
  ]
  const sumConditions = [
    ...(allowedIds !== null
      ? [inArray(eventRollupDaily.domainId, allowedIds)]
      : []),
    ...getRollupDayConditions(from, to),
  ]

  const [domainCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(domains)
    .where(and(...domainConditions))
  const [reportCount] = await db
    .select({
      count: sql<number>`count(distinct ${normalizedEvents.rawReportId})`,
    })
    .from(normalizedEvents)
    .where(and(...reportConditions))
  const [eventSums] = await db
    .select({
      total: sql<number>`coalesce(sum(${eventRollupDaily.totalCount}), 0)`,
      passed: sql<number>`coalesce(sum(${eventRollupDaily.passedCount}), 0)`,
    })
    .from(eventRollupDaily)
    .where(and(...sumConditions))

  const totalEmails = Number(eventSums?.total ?? 0)
  const passed = Number(eventSums?.passed ?? 0)
  const overallPassRate = totalEmails > 0 ? (passed / totalEmails) * 100 : 0
  return {
    totalDomains: Number(domainCount?.count ?? 0),
    totalReports: Number(reportCount?.count ?? 0),
    totalEmails,
    overallPassRate,
  }
}
