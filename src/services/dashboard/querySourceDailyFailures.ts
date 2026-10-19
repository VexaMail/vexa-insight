import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import type { DayRange, IpDailyCount } from '@/types/dashboard'
import { dayToUnixSeconds } from '@/utils/dashboard'
import { and, eq, gte, inArray, lt, sql } from 'drizzle-orm'
import { DMARC_FAILING_SQL } from './dmarcFailingSql'
import { domainScope } from './domainScope'

/** DMARC-failing messages per UTC report day for the given sending IPs. */
export async function querySourceDailyFailures(
  ips: string[],
  range: DayRange,
  allowedIds: number[] | null,
): Promise<IpDailyCount[]> {
  if (ips.length === 0) return []
  const e = normalizedEvents
  const day = sql<number>`cast(${e.reportEndDate} / 86400 as integer)`
  return getDb()
    .select({ ip: ipAddresses.ip, day, count: sql<number>`sum(${e.count})` })
    .from(e)
    .innerJoin(ipAddresses, eq(ipAddresses.id, e.ipAddressId))
    .where(
      and(
        inArray(ipAddresses.ip, ips),
        gte(e.reportEndDate, dayToUnixSeconds(range.fromDay)),
        lt(e.reportEndDate, dayToUnixSeconds(range.toDay + 1)),
        DMARC_FAILING_SQL,
        domainScope(e.domainId, allowedIds),
      ),
    )
    .groupBy(ipAddresses.ip, day)
}
