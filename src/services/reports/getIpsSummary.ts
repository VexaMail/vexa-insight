import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpsSummaryResponse } from '@/types/ips'
import { queryIpsSummaryRows } from './queryIpsSummaryRows'
import { toIpSummaryData } from './toIpSummaryData'

export async function getIpsSummary(
  dateRange?: IpDateRange,
): Promise<IpsSummaryResponse> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return { ips: [] }

  const rows = await queryIpsSummaryRows(allowedIds, dateRange)
  return { ips: rows.map((row) => toIpSummaryData(row)) }
}
