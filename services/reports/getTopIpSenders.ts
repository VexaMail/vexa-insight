import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import { desc, eq, sql } from 'drizzle-orm'
import type { TopIpSender } from './TopIpSender'

/**
 * Returns the top N IPs by total message count across all normalizedEvents.
 */
export async function getTopIpSenders(limit = 10): Promise<TopIpSender[]> {
  const db = getDb()
  const rows = await db
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      emailsSentCount: ipAddresses.emailsSentCount,
      totalMessages: sql<number>`sum(${normalizedEvents.count})`.as(
        'total_messages',
      ),
      hostname: ipHostnameEnrichments.hostname,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipAddresses.ip, ipHostnameEnrichments.ip),
    )
    .groupBy(ipAddresses.id, ipHostnameEnrichments.hostname)
    .orderBy(desc(sql`sum(${normalizedEvents.count})`))
    .limit(limit)

  return rows.map((r) => ({
    ip: r.ip,
    countryCode: r.countryCode,
    emailsSentCount: r.emailsSentCount,
    totalMessages: Number(r.totalMessages),
    hostname: r.hostname,
  }))
}
