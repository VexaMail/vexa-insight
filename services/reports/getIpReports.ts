import { getDb, ipAddresses, normalizedEvents, rawReports } from '@/lib/db'
import type { IpRelatedReportRow } from '@/types/IpRelatedReportRow'
import type { IpDateRange } from '@/types/filters'
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'

export async function getIpReports(
  ip: string,
  dateRange?: IpDateRange,
  limit: number = 25,
  offset: number = 0,
): Promise<IpRelatedReportRow[]> {
  const db = getDb()

  const rows = await db
    .select({
      id: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      reportStartDate: rawReports.beginDate,
      reportEndDate: rawReports.endDate,
      messageCount: sql<number>`sum(${normalizedEvents.count})`.as('msg_count'),
    })
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(
      and(
        eq(ipAddresses.ip, ip),
        dateRange?.fromTs
          ? gte(rawReports.endDate, dateRange.fromTs)
          : undefined,
        dateRange?.toTs ? lte(rawReports.endDate, dateRange.toTs) : undefined,
      ),
    )
    .groupBy(rawReports.id)
    .orderBy(desc(rawReports.endDate))
    .limit(limit)
    .offset(offset)

  return rows.map((r) => ({
    id: r.id,
    reportId: r.reportId,
    orgName: r.orgName,
    reportStartDate: Number(r.reportStartDate),
    reportEndDate: Number(r.reportEndDate),
    messageCount: Number(r.messageCount),
  }))
}
