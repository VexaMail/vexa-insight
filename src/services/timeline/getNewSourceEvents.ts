import { domains, getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import type { TimelineEvent } from '@/types/timeline'
import { eq, sql } from 'drizzle-orm'

/** Sources whose first report for this domain falls after `since`. */
export async function getNewSourceEvents(
  domainName: string,
  since: number,
): Promise<TimelineEvent[]> {
  const firstSeen =
    sql<number>`min(${normalizedEvents.reportBeginDate})`.mapWith(Number)
  const rows = await getDb()
    .select({
      ip: ipAddresses.ip,
      firstSeen,
      messages: sql<number>`sum(${normalizedEvents.count})`.mapWith(Number),
    })
    .from(normalizedEvents)
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(domains.name, domainName))
    .groupBy(ipAddresses.ip)
    .having(sql`min(${normalizedEvents.reportBeginDate}) >= ${since}`)
  return rows.map((row) => ({
    at: row.firstSeen,
    kind: 'new_source',
    title: 'New sending source',
    detail: `${row.ip} (${String(row.messages)} messages so far)`,
    href: `/ips/${encodeURIComponent(row.ip)}`,
  }))
}
