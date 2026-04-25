import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import { fetchTrendData } from '@/lib/charts'
import { useDashboardFilters } from '@/store'
import type { UseTrendChartReturn } from '@/types/charts'
import {
  getDurationHours,
  getTrendPeriodFromDurationHours,
} from '@/utils/dates'
import { useEffect, useState } from 'react'

export function useTrendChart(): UseTrendChartReturn & { isLoading: boolean } {
  const queryString = useDateFilterParams()
  const days = useDashboardFilters((s) => s.days)
  const from = useDashboardFilters((s) => s.from)
  const to = useDashboardFilters((s) => s.to)
  const [data, setData] = useState<UseTrendChartReturn['data']>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const now = new Date()
    const durationHours = getDurationHours({ days, from, to, now })
    const period = getTrendPeriodFromDurationHours(durationHours)

    const run = async () => {
      setIsLoading(true)
      try {
        const trend = await fetchTrendData({ period, queryString })
        setData(trend)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    }
    void run()
  }, [queryString, days, from, to])

  return { data, isLoading }
}
