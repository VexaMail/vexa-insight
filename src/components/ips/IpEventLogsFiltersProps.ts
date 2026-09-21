import type { IpLogsQuery } from '@/types/ips'

export type IpEventLogsFiltersProps = {
  query: IpLogsQuery
  onChange: (query: IpLogsQuery) => void
}
