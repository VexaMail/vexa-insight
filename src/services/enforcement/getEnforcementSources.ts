import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { eq, sql } from 'drizzle-orm'

/** Per source IP: messages, DMARC-passing messages and reverse DNS. */
export async function getEnforcementSources(whereClause: SQL | undefined) {
  return getDb()
    .select({
      sourceIp: ipAddresses.ip,
      hostname: ipHostnameEnrichments.hostname,
      messages: sql<number>`sum(${normalizedEvents.count})`,
      passingMessages: sql<number>`sum(case when ${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end)`,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(ipAddresses.id, normalizedEvents.ipAddressId))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipHostnameEnrichments.ip, ipAddresses.ip),
    )
    .where(whereClause)
    .groupBy(ipAddresses.ip, ipHostnameEnrichments.hostname)
}
