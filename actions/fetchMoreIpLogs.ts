'use server'

import { requireActionPermission } from '@/services/auth'
import { getIpLogs } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpLogs(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  await requireActionPermission('reports:read')
  return await getIpLogs(ip, dateRange, 50, offset)
}
