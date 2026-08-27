import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { VolumeByOrg } from '@/types/reports'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

export async function getVolumeByOrg(
  from?: Date,
  to?: Date,
): Promise<VolumeByOrg[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const query = db
    .select({
      orgName: rawReports.orgName,
      reportCount: sql<number>`count(distinct ${rawReports.id})`,
    })
    .from(rawReports)

  const conditions = []
  let hasJoinedNormalizedEvents = false

  if (allowedIds !== null) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    hasJoinedNormalizedEvents = true
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }

  if (from || to) {
    if (!hasJoinedNormalizedEvents) {
      query.innerJoin(
        normalizedEvents,
        eq(rawReports.id, normalizedEvents.rawReportId),
      )
    }
    conditions.push(...getDateRangeConditions(from, to))
  }

  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  const rows = await query
    .groupBy(rawReports.orgName)
    .orderBy(desc(sql<number>`count(distinct ${rawReports.id})`))
  return rows.map((r) => ({
    orgName: r.orgName,
    reportCount: r.reportCount,
  }))
}
