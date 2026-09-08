import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpSummaryData } from '@/types/ips'
import { queryIpDetailRow } from './queryIpDetailRow'
import { toIpSummaryData } from './toIpSummaryData'

export async function getIpDetail(
  ip: string,
  dateRange?: IpDateRange,
): Promise<IpSummaryData | null> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const row = await queryIpDetailRow(ip, allowedIds, dateRange)
  if (!row) return null

  // The domain filter lives in the LEFT JOIN, so a restricted caller still gets
  // the ipAddresses row back with null aggregates when the IP never sent to one
  // of their domains. Treat that as not-found rather than rendering a zeroed
  // page for an IP they are not entitled to see. Unrestricted callers keep the
  // old behaviour (a zeroed row when the date range is simply empty).
  if (allowedIds !== null && row.totalMessages === null) return null

  return toIpSummaryData(row)
}
