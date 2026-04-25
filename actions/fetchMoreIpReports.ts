'use server'

import { getIpReports } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpReports(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  return await getIpReports(ip, dateRange, 25, offset)
}
