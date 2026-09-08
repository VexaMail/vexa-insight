import { getDb, normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** Message count per DMARC disposition. */
export async function queryDispositionBreakdown(
  whereClause: SQL | undefined,
): Promise<Record<string, number>> {
  const rows = await getDb()
    .select({
      disposition: normalizedEvents.disposition,
      count: sql<number>`cast(sum(${normalizedEvents.count}) as integer)`,
    })
    .from(normalizedEvents)
    .where(whereClause)
    .groupBy(normalizedEvents.disposition)

  const breakdown: Record<string, number> = {}
  for (const row of rows) {
    breakdown[row.disposition] = row.count
  }
  return breakdown
}
