import { domains, getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { IpDateRange } from '@/types/filters'
import { and, desc, eq, gte, inArray, lte, sql } from 'drizzle-orm'

export async function getIpDomains(
  ip: string,
  dateRange?: IpDateRange,
  limit: number = 25,
  offset: number = 0,
): Promise<IpRelatedDomainRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const rows = await db
    .select({
      domainId: domains.id,
      domain: domains.name,
      messageCount: sql<number>`sum(${normalizedEvents.count})`.as('msg_count'),
      firstSeenAt: sql<number>`min(${normalizedEvents.reportBeginDate})`.as(
        'first_seen',
      ),
      lastSeenAt: sql<number>`max(${normalizedEvents.reportEndDate})`.as(
        'last_seen',
      ),
    })
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(
      and(
        eq(ipAddresses.ip, ip),
        allowedIds !== null
          ? inArray(normalizedEvents.domainId, allowedIds)
          : undefined,
        dateRange?.fromTs
          ? gte(normalizedEvents.reportEndDate, dateRange.fromTs)
          : undefined,
        dateRange?.toTs
          ? lte(normalizedEvents.reportEndDate, dateRange.toTs)
          : undefined,
      ),
    )
    .groupBy(domains.id)
    .orderBy(desc(sql`msg_count`), desc(sql`last_seen`))
    .limit(limit)
    .offset(offset)

  return rows.map((r) => ({
    domainId: r.domainId,
    domain: r.domain,
    messageCount: r.messageCount,
    firstSeenAt: r.firstSeenAt ? r.firstSeenAt : null,
    lastSeenAt: r.lastSeenAt ? r.lastSeenAt : null,
  }))
}
