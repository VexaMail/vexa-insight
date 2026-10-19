import { ipLogsQueryDefaults } from '@/constants/ips'
import {
  domains,
  getDb,
  ipAddresses,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpLogRow } from '@/types/IpLogRow'
import { and, eq } from 'drizzle-orm'
import type { GetIpLogsParams } from './GetIpLogsParams'
import { ipEventConditions } from './ipEventConditions'
import { ipLogSelection } from './ipLogSelection'
import { ipLogsFilterConditions } from './ipLogsFilterConditions'
import { ipLogsOrderBy } from './ipLogsOrderBy'

export async function getIpLogs({
  ip,
  dateRange,
  limit = 50,
  offset = 0,
  query = ipLogsQueryDefaults,
}: GetIpLogsParams): Promise<IpLogRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const rows = await db
    .select(ipLogSelection)
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(
      and(
        ipEventConditions({
          ip,
          allowedIds,
          dateRange,
          dateColumn: normalizedEvents.reportBeginDate,
        }),
        ipLogsFilterConditions(query),
      ),
    )
    .orderBy(...ipLogsOrderBy(query.sort))
    .limit(limit)
    .offset(offset)

  return rows.map((r) => ({ ...r, envelopeFrom: null }))
}
