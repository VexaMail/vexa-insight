import {
  domains,
  getDb,
  ipAddresses,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpLogRow } from '@/types/IpLogRow'
import type { IpDateRange } from '@/types/filters'
import { desc, eq } from 'drizzle-orm'
import { ipEventConditions } from './ipEventConditions'

export async function getIpLogs(
  ip: string,
  dateRange?: IpDateRange,
  limit: number = 50,
  offset: number = 0,
): Promise<IpLogRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

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
      ipEventConditions({
        ip,
        allowedIds,
        dateRange,
        dateColumn: normalizedEvents.reportBeginDate,
      }),
    )
    .orderBy(desc(normalizedEvents.reportBeginDate))
    .limit(limit)
    .offset(offset)

  return rows.map((r) => ({ ...r, envelopeFrom: null }))
}
