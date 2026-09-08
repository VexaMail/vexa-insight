import { getDb, normalizedEvents } from '@/lib/db'
import { count } from 'drizzle-orm'

/** Event count per applied policy disposition. */
export function queryEventsByDisposition(): Record<string, number> {
  const rows = getDb()
    .select({ disposition: normalizedEvents.disposition, value: count() })
    .from(normalizedEvents)
    .groupBy(normalizedEvents.disposition)
    .all()

  return Object.fromEntries(rows.map((row) => [row.disposition, row.value]))
}
