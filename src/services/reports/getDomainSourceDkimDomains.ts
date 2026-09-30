import {
  getDb,
  ipAddresses,
  normalizedEventDkimResults,
  normalizedEvents,
} from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { eq, sql } from 'drizzle-orm'

/**
 * The distinct DKIM signing domains seen for each source IP of a domain,
 * keyed by IP, for naming the sender behind it.
 */
export async function getDomainSourceDkimDomains(
  whereClause: SQL | undefined,
): Promise<Map<string, string[]>> {
  const rows = await getDb()
    .select({
      ip: ipAddresses.ip,
      domains: sql<
        string | null
      >`group_concat(distinct ${normalizedEventDkimResults.domain})`,
    })
    .from(normalizedEventDkimResults)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.id, normalizedEventDkimResults.eventId),
    )
    .innerJoin(ipAddresses, eq(ipAddresses.id, normalizedEvents.ipAddressId))
    .where(whereClause)
    .groupBy(ipAddresses.ip)

  return new Map(
    rows.map((row) => [row.ip, row.domains ? row.domains.split(',') : []]),
  )
}
