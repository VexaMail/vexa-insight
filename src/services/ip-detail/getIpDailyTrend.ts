import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpDailyPoint } from '@/types/ips'
import { asc, eq, sql } from 'drizzle-orm'
import { ipEventConditions } from '../reports/ipEventConditions'
import { ipDailyTrendSelection } from './ipDailyTrendSelection'

/**
 * One source's mail per UTC day in the window: volume and how many messages
 * passed SPF authentication, DKIM authentication and DMARC. Days follow the
 * report end date, like the totals of the page.
 */
export async function getIpDailyTrend(
  ip: string,
  dateRange?: IpDateRange,
): Promise<IpDailyPoint[]> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const rows = await getDb()
    .select(ipDailyTrendSelection)
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .where(
      ipEventConditions({
        ip,
        allowedIds,
        dateRange,
        dateColumn: normalizedEvents.reportEndDate,
      }),
    )
    .groupBy(sql`day`)
    .orderBy(asc(sql`day`))

  return rows
}
