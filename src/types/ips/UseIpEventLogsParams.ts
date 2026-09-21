import type { IpLogRow } from '@/types/IpLogRow'
import type { IpDateRange } from '@/types/filters'

export type UseIpEventLogsParams = {
  initialLogs: IpLogRow[]
  ip: string
  dateRange: IpDateRange
}
