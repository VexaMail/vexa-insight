import { normalizedEvents } from '@/lib/db'
import { toUnixSeconds } from '@/utils/dates'
import { gte, lte, type SQL } from 'drizzle-orm'

/**
 * Generates Drizzle conditions for filtering normalizedEvents by reportEndDate.
 * Returns an array of SQL conditions that can be spread into `and(...)`.
 */
export function getDateRangeConditions(from?: Date, to?: Date): SQL[] {
  const conditions: SQL[] = []
  if (from) {
    conditions.push(gte(normalizedEvents.reportEndDate, toUnixSeconds(from)))
  }
  if (to) {
    conditions.push(lte(normalizedEvents.reportEndDate, toUnixSeconds(to)))
  }
  return conditions
}
