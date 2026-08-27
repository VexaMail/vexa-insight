'use server'

import { requireActionPermission } from '@/services/auth'
import { getIpDomains } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'

export async function fetchMoreIpDomains(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
) {
  await requireActionPermission('reports:read')
  return await getIpDomains(ip, dateRange, 25, offset)
}
