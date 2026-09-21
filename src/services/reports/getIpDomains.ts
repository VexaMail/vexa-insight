import { ipDomainsQueryDefaults } from '@/constants/ips'
import { domains, getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import { and, eq, like, sql } from 'drizzle-orm'
import type { GetIpDomainsParams } from './GetIpDomainsParams'
import { ipDomainsOrderBy } from './ipDomainsOrderBy'
import { ipEventConditions } from './ipEventConditions'
import { toIpRelatedDomainRow } from './toIpRelatedDomainRow'

export async function getIpDomains({
  ip,
  dateRange,
  limit = 25,
  offset = 0,
  query = ipDomainsQueryDefaults,
}: GetIpDomainsParams): Promise<IpRelatedDomainRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const search = query.search.trim()

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
        ipEventConditions({
          ip,
          allowedIds,
          dateRange,
          dateColumn: normalizedEvents.reportEndDate,
        }),
        search === '' ? undefined : like(domains.name, `%${search}%`),
      ),
    )
    .groupBy(domains.id)
    .orderBy(...ipDomainsOrderBy(query.sort))
    .limit(limit)
    .offset(offset)

  return rows.map(toIpRelatedDomainRow)
}
