import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import type { DomainSource } from '@/types/reports'
import { getCutoffUnixSecondsFromDays } from '@/utils/dates'
import { and, eq, gte, sql } from 'drizzle-orm'
import { getDomainSourceDkimDomains } from './getDomainSourceDkimDomains'
import { toDomainSource } from './toDomainSource'

/**
 * Returns source IPs with message counts for a domain, each named after the
 * sending service when its hostname or DKIM domains are in the catalog.
 * GeoIP data is read from the ip_addresses table (DB-first, no runtime geoip-lite calls).
 * Optionally filter to events within the last `days` days (by report end date).
 */
export async function getDomainSources(
  domainId: number,
  days?: number,
): Promise<DomainSource[]> {
  const db = getDb()
  const cutoff =
    days != null ? getCutoffUnixSecondsFromDays(new Date(), days) : undefined
  const whereClause =
    cutoff != null
      ? and(
          eq(normalizedEvents.domainId, domainId),
          gte(normalizedEvents.reportEndDate, cutoff),
        )
      : eq(normalizedEvents.domainId, domainId)

  const rows = await db
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      count: sql<number>`sum(${normalizedEvents.count})`.as('count'),
      hostname: ipHostnameEnrichments.hostname,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipAddresses.ip, ipHostnameEnrichments.ip),
    )
    .where(whereClause)
    .groupBy(ipAddresses.id, ipHostnameEnrichments.hostname)

  const dkimDomainsByIp = await getDomainSourceDkimDomains(whereClause)
  return rows.map((r) => toDomainSource(r, dkimDomainsByIp.get(r.ip) ?? []))
}
