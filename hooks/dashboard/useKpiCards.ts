import type { DomainsSummaryResponse } from '@/types/reports'
import { useEffect, useState } from 'react'
import { useDateFilterParams } from '../useDateFilterParams'

export function useKpiCards() {
  const queryString = useDateFilterParams()
  const [data, setData] = useState<DomainsSummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const qs = queryString ? `?${queryString}` : ''

    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/v1/domains/summary${qs}`)
        const json = (await res.json()) as { data: DomainsSummaryResponse }
        setData(json.data)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryString])

  return { overall: data?.overall ?? null, isLoading }
}
