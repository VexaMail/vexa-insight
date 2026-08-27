import { fetchMoreIpLogs } from '@/actions/fetchMoreIpLogs'
import type { IpLogRow } from '@/types/IpLogRow'
import type { IpDateRange } from '@/types/filters'
import { useState } from 'react'

export function useIpEventLogs({
  initialLogs,
  ip,
  dateRange,
}: {
  initialLogs: IpLogRow[]
  ip: string
  dateRange: IpDateRange
}) {
  const filterKey = `${ip}|${String(dateRange.fromTs ?? '')}|${String(dateRange.toTs ?? '')}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  const [logs, setLogs] = useState<IpLogRow[]>(initialLogs)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialLogs.length === 50)

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setLogs(initialLogs)
    setHasMore(initialLogs.length === 50)
  }

  const handleLoadMore = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const more = await fetchMoreIpLogs(ip, logs.length, dateRange)
      if (more.length > 0) {
        setLogs((prev) => [...prev, ...more])
      }
      if (more.length < 50) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { logs, isLoading, hasMore, handleLoadMore }
}
