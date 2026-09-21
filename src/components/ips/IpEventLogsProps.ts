import type { IpDateRange } from '@/types/filters'
import type { IpLogRow } from '@/types/IpLogRow'

export type IpEventLogsProps = {
  readonly initialLogs: IpLogRow[]
  readonly ip: string
  readonly dateRange: IpDateRange
}
