import type { IpLogRow } from '@/types/IpLogRow'
import type { IpLogsQuery } from './IpLogsQuery'

export type UseIpEventLogsReturn = {
  logs: IpLogRow[]
  query: IpLogsQuery
  isLoading: boolean
  hasMore: boolean
  handleQueryChange: (query: IpLogsQuery) => void
  handleLoadMore: () => Promise<void>
}
