import {
  domains,
  getDb,
  ipAddresses,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import type { IpLogRow } from '@/types/IpLogRow'
import type { IpDateRange } from '@/types/filters'
import { and, desc, eq, gte, lte } from 'drizzle-orm'

export async function getIpLogs(
  ip: string,
  dateRange?: IpDateRange,
  limit: number = 50,
  offset: number = 0,
): Promise<IpLogRow[]> {
  const db = getDb()

  const rows = await db
    .select({
      eventId: normalizedEvents.id,
      headerFrom: domains.name,
      disposition: normalizedEvents.disposition,
      spfResult: normalizedEvents.spfResult,
      dkimResult: normalizedEvents.dkimResult,
      count: normalizedEvents.count,
      reportId: rawReports.reportId,
      observedAt: normalizedEvents.reportBeginDate,
    })
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(
      and(
        eq(ipAddresses.ip, ip),
        dateRange?.fromTs
          ? gte(normalizedEvents.reportBeginDate, dateRange.fromTs)
          : undefined,
        dateRange?.toTs
          ? lte(normalizedEvents.reportBeginDate, dateRange.toTs)
          : undefined,
      ),
    )
    .orderBy(desc(normalizedEvents.reportBeginDate))
    .limit(limit)
    .offset(offset)

  return rows.map((r) => ({
    eventId: r.eventId,
    headerFrom: r.headerFrom,
    envelopeFrom: null,
    disposition: r.disposition,
    spfResult: r.spfResult,
    dkimResult: r.dkimResult,
    count: Number(r.count),
    reportId: r.reportId,
    observedAt: Number(r.observedAt),
  }))
}
