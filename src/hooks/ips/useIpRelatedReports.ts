import { fetchMoreIpReports } from '@/actions/fetchMoreIpReports'
import type { IpRelatedReportRow } from '@/types/IpRelatedReportRow'
import type { IpDateRange } from '@/types/filters'
import { useState } from 'react'

export function useIpRelatedReports({
  initialReports,
  ip,
  dateRange,
}: {
  initialReports: IpRelatedReportRow[]
  ip: string
  dateRange: IpDateRange
}) {
  const filterKey = `${ip}|${String(dateRange.fromTs ?? '')}|${String(dateRange.toTs ?? '')}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  const [reports, setReports] = useState<IpRelatedReportRow[]>(initialReports)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialReports.length === 25)

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setReports(initialReports)
    setHasMore(initialReports.length === 25)
  }

  const handleLoadMore = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const more = await fetchMoreIpReports(ip, reports.length, dateRange)
      if (more.length > 0) {
        setReports((prev) => [...prev, ...more])
      }
      if (more.length < 25) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { reports, isLoading, hasMore, handleLoadMore }
}
