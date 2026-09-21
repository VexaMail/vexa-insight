'use server'

import { requireActionPermission } from '@/services/auth'
import { getIpDomains } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'
import type { IpDomainsQuery } from '@/types/ips'

export async function fetchMoreIpDomains(
  ip: string,
  offset: number,
  dateRange?: IpDateRange,
  query?: IpDomainsQuery,
) {
  await requireActionPermission('reports:read')
  return await getIpDomains({ ip, dateRange, limit: 25, offset, query })
}
