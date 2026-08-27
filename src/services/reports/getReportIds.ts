import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { desc, eq, inArray } from 'drizzle-orm'

/**
 * Returns all raw report ids (as strings) visible to the current user,
 * newest-ingested first. Domain-restricted users only see reports that
 * have normalized events for their allowed domains.
 */
export async function getReportIds(): Promise<string[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return []
  }

  const query = db.selectDistinct({ id: rawReports.id }).from(rawReports)

  if (allowedIds !== null) {
    query.innerJoin(
      normalizedEvents,
      eq(rawReports.id, normalizedEvents.rawReportId),
    )
    query.where(inArray(normalizedEvents.domainId, allowedIds))
  }

  const result = await query.orderBy(desc(rawReports.ingestedAt))
  return result.map((r) => r.id.toString())
}
