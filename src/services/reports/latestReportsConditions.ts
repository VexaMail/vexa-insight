import { normalizedEvents, rawReports } from '@/lib/db'
import type { LatestReportsFilter } from '@/types/reports'
import type { SQL } from 'drizzle-orm'
import { eq, inArray } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/** Where conditions of the latest-reports query, in join-dependency order. */
export function latestReportsConditions(
  filter: LatestReportsFilter,
): (SQL | undefined)[] {
  const conditions: (SQL | undefined)[] = []

  if (filter.allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, filter.allowedIds))
  }
  if (filter.from ?? filter.to) {
    conditions.push(...getDateRangeConditions(filter.from, filter.to))
  }
  if (filter.domainId !== undefined) {
    conditions.push(eq(normalizedEvents.domainId, filter.domainId))
  }
  if (filter.org !== undefined && filter.org !== '') {
    conditions.push(eq(rawReports.orgName, filter.org))
  }

  return conditions
}
