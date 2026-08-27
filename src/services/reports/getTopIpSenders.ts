import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { desc, eq, inArray, sql } from 'drizzle-orm'
import type { TopIpSender } from './TopIpSender'

/**
 * Returns the top N IPs by total message count across normalizedEvents the
 * caller is allowed to see. Restricted users get totals computed only from
 * their allowed domains, so an IP that never sent to one of those domains
 * does not appear at all.
 */
export async function getTopIpSenders(limit = 10): Promise<TopIpSender[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

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
    .where(
      allowedIds !== null
        ? inArray(normalizedEvents.domainId, allowedIds)
        : undefined,
    )
    .groupBy(ipAddresses.id, ipHostnameEnrichments.hostname)
    .orderBy(desc(sql`sum(${normalizedEvents.count})`))
    .limit(limit)

  return rows.map((r) => ({
    ip: r.ip,
    countryCode: r.countryCode,
    emailsSentCount: r.emailsSentCount,
    totalMessages: r.totalMessages,
    hostname: r.hostname,
  }))
}
