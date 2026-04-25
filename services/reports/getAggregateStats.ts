import { domains, getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { AggregateStats } from '@/types/reports'
import { and, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/**
 * Returns aggregate stats: total domains, reports, emails, and overall pass rate.
 */
export async function getAggregateStats(
  from?: Date,
  to?: Date,
): Promise<AggregateStats> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  const domainQuery = db.select({ count: sql<number>`count(*)` }).from(domains)
  const reportQuery = db
    .select({
      count: sql<number>`count(distinct ${normalizedEvents.rawReportId})`,
    })
    .from(normalizedEvents)
  const eventSumsQuery = db
    .select({
      total: sql<number>`sum(${normalizedEvents.count})`,
      passed: sql<number>`sum(case when ${normalizedEvents.spfResult} = 'pass' or ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
    })
    .from(normalizedEvents)

  if (allowedIds !== null) {
    if (allowedIds.length === 0) {
      return {
        totalDomains: 0,
        totalReports: 0,
        totalEmails: 0,
        overallPassRate: 0,
      }
    }
    domainQuery.where(inArray(domains.id, allowedIds))
    reportQuery.where(inArray(normalizedEvents.domainId, allowedIds))
    eventSumsQuery.where(inArray(normalizedEvents.domainId, allowedIds))
  }

  const dateConditions = getDateRangeConditions(from, to)

  if (dateConditions.length > 0) {
    // If allowedIds applied a where clause earlier, we need to respect it or use 'and' carefully.
    // Drizzle's .where() overwrites the previous where, so we should build the conditions list.
    const runDomainConditions =
      allowedIds !== null
        ? [inArray(normalizedEvents.domainId, allowedIds)]
        : []
    const allConditions = [...runDomainConditions, ...dateConditions]
    reportQuery.where(and(...allConditions))
    eventSumsQuery.where(and(...allConditions))
  }

  // NOTE: For reportQuery we switched from rawReports count(*) to count(distinct normalizedEvents.rawReportId)
  // because rawReports don't have domainId natively. This is safer for restricted scopes, and identical for unrestricted.

  const [domainCount] = await domainQuery
  const [reportCount] = await reportQuery
  const [eventSums] = await eventSumsQuery

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
