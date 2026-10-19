import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import type { SourceAuthCounts } from '@/types/domains'
import { getCutoffUnixSecondsFromDays } from '@/utils/dates'
import { and, eq, gte } from 'drizzle-orm'
import { sourceAuthSelection } from './sourceAuthSelection'

/**
 * Per source IP of a domain: messages split by SPF auth, SPF aligned, DKIM
 * auth, DKIM aligned and DMARC, plus why the failing ones failed. Optionally
 * limited to the last `days` days by report end date.
 */
export async function getDomainSourceAuth(
  domainId: number,
  days?: number,
): Promise<Map<string, SourceAuthCounts>> {
  const cutoff =
    days == null ? undefined : getCutoffUnixSecondsFromDays(new Date(), days)
  const rows = await getDb()
    .select({ ip: ipAddresses.ip, ...sourceAuthSelection() })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(ipAddresses.id, normalizedEvents.ipAddressId))
    .where(
      and(
        eq(normalizedEvents.domainId, domainId),
        cutoff == null
          ? undefined
          : gte(normalizedEvents.reportEndDate, cutoff),
      ),
    )
    .groupBy(ipAddresses.ip)
  return new Map(rows.map(({ ip, ...counts }) => [ip, counts]))
}
