import { getDb, normalizedEvents } from '@/lib/db'
import { count } from 'drizzle-orm'

/** Event count per SPF authentication result. */
export function queryEventsBySpfAuth(): Record<string, number> {
  const rows = getDb()
    .select({ spfAuthResult: normalizedEvents.spfAuthResult, value: count() })
    .from(normalizedEvents)
    .groupBy(normalizedEvents.spfAuthResult)
    .all()

  return Object.fromEntries(rows.map((row) => [row.spfAuthResult, row.value]))
}
