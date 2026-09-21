'use server'

import { requireActionPermission } from '@/services/auth'
import { getIpLogs } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'
import type { IpLogsQuery } from '@/types/ips'

export async function fetchMoreIpLogs(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
  query?: IpLogsQuery,
) {
  await requireActionPermission('reports:read')
  return await getIpLogs({ ip, dateRange, limit: 50, offset, query })
}
