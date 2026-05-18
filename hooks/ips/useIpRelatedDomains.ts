import { fetchMoreIpDomains } from '@/actions/fetchMoreIpDomains'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { IpDateRange } from '@/types/filters'
import { useState } from 'react'

export function useIpRelatedDomains({
  initialDomains,
  ip,
  dateRange,
}: {
  initialDomains: IpRelatedDomainRow[]
  ip: string
  dateRange: IpDateRange
}) {
  const filterKey = `${ip}|${dateRange.fromTs ?? ''}|${dateRange.toTs ?? ''}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  const [domains, setDomains] = useState<IpRelatedDomainRow[]>(initialDomains)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialDomains.length === 25)

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setDomains(initialDomains)
    setHasMore(initialDomains.length === 25)
  }

  const handleLoadMore = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const more = await fetchMoreIpDomains(ip, domains.length, dateRange)
      if (more.length > 0) {
        setDomains((prev) => [...prev, ...more])
      }
      if (more.length < 25) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { domains, isLoading, hasMore, handleLoadMore }
}
