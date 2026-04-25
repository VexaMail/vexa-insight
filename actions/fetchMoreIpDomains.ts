'use server'

import { getIpDomains } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpDomains(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  return await getIpDomains(ip, dateRange, 25, offset)
}
