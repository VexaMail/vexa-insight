import type { IpDateRange } from '@/types/filters'
import type { IpDomainsQuery } from '@/types/ips'

export type GetIpDomainsParams = {
  readonly ip: string
  readonly dateRange?: IpDateRange | undefined
  readonly limit?: number | undefined
  readonly offset?: number | undefined
  readonly query?: IpDomainsQuery | undefined
}
