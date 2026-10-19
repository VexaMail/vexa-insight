import { domains, getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import type { SourcePeriodRow, TriageWindow } from '@/types/dashboard'
import { dayToUnixSeconds } from '@/utils/dashboard'
import { and, eq, gte, lt, sql } from 'drizzle-orm'
import { DMARC_FAILING_SQL } from './dmarcFailingSql'
import { domainScope } from './domainScope'

/**
 * Per sending IP and domain: messages and DMARC failures in the current
 * period and failures in the previous one, over the same day buckets as the
 * rollup (`reportEndDate` inside the days).
 */
export async function querySourcePeriodRows(
  window: TriageWindow,
  allowedIds: number[] | null,
): Promise<SourcePeriodRow[]> {
  const e = normalizedEvents
  const start = dayToUnixSeconds(
    window.previous?.fromDay ?? window.current.fromDay,
  )
  const curStart = dayToUnixSeconds(window.current.fromDay)
  const end = dayToUnixSeconds(window.current.toDay + 1)
  const inCurrent = sql`${e.reportEndDate} >= ${curStart}`
  return getDb()
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      domainName: domains.name,
      currentTotal: sql<number>`coalesce(sum(case when ${inCurrent} then ${e.count} end), 0)`,
      currentFailed: sql<number>`coalesce(sum(case when ${inCurrent} and ${DMARC_FAILING_SQL} then ${e.count} end), 0)`,
      previousFailed: sql<number>`coalesce(sum(case when not ${inCurrent} and ${DMARC_FAILING_SQL} then ${e.count} end), 0)`,
      lastFailedAt: sql<
        number | null
      >`max(case when ${inCurrent} and ${DMARC_FAILING_SQL} then ${e.reportEndDate} end)`,
    })
    .from(e)
    .innerJoin(ipAddresses, eq(ipAddresses.id, e.ipAddressId))
    .innerJoin(domains, eq(domains.id, e.domainId))
    .where(
      and(
        gte(e.reportEndDate, start),
        lt(e.reportEndDate, end),
        domainScope(e.domainId, allowedIds),
      ),
    )
    .groupBy(ipAddresses.id, domains.id)
}
