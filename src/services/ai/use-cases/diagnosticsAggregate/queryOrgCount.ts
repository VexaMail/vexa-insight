import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { eq, sql } from 'drizzle-orm'

/** Number of distinct organizations that reported on the filtered events. */
export async function queryOrgCount(
  whereClause: SQL | undefined,
): Promise<number> {
  const [row] = await getDb()
    .select({
      orgCount: sql<number>`cast(count(distinct ${rawReports.orgName}) as integer)`,
    })
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(whereClause)

  return row?.orgCount ?? 0
}
