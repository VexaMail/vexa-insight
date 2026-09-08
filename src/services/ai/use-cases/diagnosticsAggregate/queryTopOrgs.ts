import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { eq, sql } from 'drizzle-orm'
import { MAX_TOP_ORGS } from '../maxTopOrgs'

/** Reporting organizations ranked by the messages they reported. */
export async function queryTopOrgs(
  whereClause: SQL | undefined,
): Promise<{ orgName: string; messageCount: number }[]> {
  return getDb()
    .select({
      orgName: rawReports.orgName,
      messageCount: sql<number>`cast(sum(${normalizedEvents.count}) as integer)`,
    })
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(whereClause)
    .groupBy(rawReports.orgName)
    .orderBy(sql`sum(${normalizedEvents.count}) desc`)
    .limit(MAX_TOP_ORGS)
}
