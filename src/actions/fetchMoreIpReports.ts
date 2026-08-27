'use server'

import { requireActionPermission } from '@/services/auth'
import { getIpReports } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpReports(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  await requireActionPermission('reports:read')
  return await getIpReports(ip, dateRange, 25, offset)
}
