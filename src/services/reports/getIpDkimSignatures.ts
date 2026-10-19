import {
  getDb,
  ipAddresses,
  normalizedEventDkimResults,
  normalizedEvents,
} from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpDkimSignature } from '@/types/ips'
import { desc, eq, sql } from 'drizzle-orm'
import { ipEventConditions } from './ipEventConditions'

/**
 * Every DKIM signer seen on one source's mail in the window: domain,
 * selector, result and whether it aligned with From, busiest first.
 */
export async function getIpDkimSignatures(
  ip: string,
  dateRange?: IpDateRange,
): Promise<IpDkimSignature[]> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const rows = await getDb()
    .select({
      domain: normalizedEventDkimResults.domain,
      selector: normalizedEventDkimResults.selector,
      result: normalizedEventDkimResults.result,
      isAligned: normalizedEventDkimResults.isAligned,
      messages: sql<number>`sum(${normalizedEvents.count})`.as('messages'),
    })
    .from(normalizedEventDkimResults)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.id, normalizedEventDkimResults.eventId),
    )
    .innerJoin(ipAddresses, eq(ipAddresses.id, normalizedEvents.ipAddressId))
    .where(
      ipEventConditions({
        ip,
        allowedIds,
        dateRange,
        dateColumn: normalizedEvents.reportEndDate,
      }),
    )
    .groupBy(
      normalizedEventDkimResults.domain,
      normalizedEventDkimResults.selector,
      normalizedEventDkimResults.result,
      normalizedEventDkimResults.isAligned,
    )
    .orderBy(desc(sql`messages`))

  return rows
}
