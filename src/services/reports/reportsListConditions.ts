import { normalizedEvents, rawReports } from '@/lib/db'
import type { ReportsListFilter } from '@/types/reports'
import type { SQL } from 'drizzle-orm'
import { eq, inArray } from 'drizzle-orm'

/** Where conditions shared by the count and the page of the reports list. */
export function reportsListConditions(
  filter: ReportsListFilter,
): (SQL | undefined)[] {
  const conditions: (SQL | undefined)[] = []

  if (filter.allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, filter.allowedIds))
  }
  if (filter.domainId !== undefined) {
    conditions.push(eq(normalizedEvents.domainId, filter.domainId))
  }
  if (filter.org !== undefined && filter.org !== '') {
    conditions.push(eq(rawReports.orgName, filter.org))
  }

  return conditions
}
