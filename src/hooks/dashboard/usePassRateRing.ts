import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type { DomainsSummaryResponse } from '@/types/reports'
import { useEffect, useState } from 'react'

export function usePassRateRing() {
  const queryString = useDateFilterParams()
  const [rate, setRate] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const qs = queryString ? `?${queryString}` : ''

    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/v1/domains/summary${qs}`)
        const json = (await res.json()) as { data: DomainsSummaryResponse }
        setRate(Math.round(json.data.overall.overallPassRate))
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryString])

  return { rate, isLoading }
}
