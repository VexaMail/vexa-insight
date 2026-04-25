import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { and, eq, inArray } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/**
 * Returns all distinct orgName values visible under the current scope,
 * filtered only by date range and optional domainId (not by pagination).
 */
export async function getReportOrgOptions(
  domainId?: number,
  from?: Date,
  to?: Date,
): Promise<string[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const query = db
    .selectDistinct({ orgName: rawReports.orgName })
    .from(rawReports)

  const needsEventsJoin =
    allowedIds !== null || domainId !== undefined || !!from || !!to

  if (needsEventsJoin) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
  }

  const conditions = []
  if (allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }
  if (domainId !== undefined) {
    conditions.push(eq(normalizedEvents.domainId, domainId))
  }
  if (from || to) {
    conditions.push(...getDateRangeConditions(from, to))
  }

  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  const rows = await query
  return rows
    .map((r) => r.orgName)
    .filter(
      (name): name is string => typeof name === 'string' && name.length > 0,
    )
    .sort((a, b) => a.localeCompare(b))
}
