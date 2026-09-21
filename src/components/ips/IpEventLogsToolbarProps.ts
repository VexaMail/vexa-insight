import type { IpLogsQuery } from '@/types/ips'

export type IpEventLogsToolbarProps = {
  query: IpLogsQuery
  onChange: (query: IpLogsQuery) => void
}
