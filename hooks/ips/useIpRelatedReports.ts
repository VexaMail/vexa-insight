import { fetchMoreIpReports } from '@/actions/fetchMoreIpReports'
import type { IpRelatedReportRow } from '@/types/IpRelatedReportRow'
import type { IpDateRange } from '@/types/filters'
import { useEffect, useState } from 'react'

export function useIpRelatedReports({
  initialReports,
  ip,
  dateRange,
}: {
  initialReports: IpRelatedReportRow[]
  ip: string
  dateRange: IpDateRange
}) {
  const [reports, setReports] = useState<IpRelatedReportRow[]>(initialReports)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialReports.length === 25)

  useEffect(() => {
    setReports(initialReports)
    setHasMore(initialReports.length === 25)
  }, [ip, dateRange.fromTs, dateRange.toTs, initialReports])

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
