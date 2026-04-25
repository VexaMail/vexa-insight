import { domains, getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { and, eq, inArray } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/**
 * Returns distinct domain names that appear in normalized events under the
 * current scope, filtered only by date range (not by pagination).
 */
export async function getReportDomainOptions(
  from?: Date,
  to?: Date,
): Promise<string[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const query = db
    .selectDistinct({ name: domains.name })
    .from(domains)
    .innerJoin(normalizedEvents, eq(normalizedEvents.domainId, domains.id))

  const conditions = []
  if (allowedIds !== null) {
    conditions.push(inArray(domains.id, allowedIds))
  }
  if (from || to) {
    conditions.push(...getDateRangeConditions(from, to))
  }
  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  const rows = await query
  return rows
    .map((r) => r.name)
    .filter(
      (name): name is string => typeof name === 'string' && name.length > 0,
    )
    .sort((a, b) => a.localeCompare(b))
}
