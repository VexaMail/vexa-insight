import { fetchMoreIpLogs } from '@/actions/fetchMoreIpLogs'
import type { IpLogRow } from '@/types/IpLogRow'
import type { IpDateRange } from '@/types/filters'
import { useEffect, useState } from 'react'

export function useIpEventLogs({
  initialLogs,
  ip,
  dateRange,
}: {
  initialLogs: IpLogRow[]
  ip: string
  dateRange: IpDateRange
}) {
  const [logs, setLogs] = useState<IpLogRow[]>(initialLogs)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialLogs.length === 50)

  useEffect(() => {
    setLogs(initialLogs)
    setHasMore(initialLogs.length === 50)
  }, [ip, dateRange.fromTs, dateRange.toTs, initialLogs])

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
