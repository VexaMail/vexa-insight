'use server'

import { getIpLogs } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpLogs(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  return await getIpLogs(ip, dateRange, 50, offset)
}
