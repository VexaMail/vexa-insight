import type { IpDateRange } from '@/types/filters'
import type { IpLogsQuery } from '@/types/ips'

export type GetIpLogsParams = {
  readonly ip: string
  readonly dateRange?: IpDateRange | undefined
  readonly limit?: number | undefined
  readonly offset?: number | undefined
  readonly query?: IpLogsQuery | undefined
}
