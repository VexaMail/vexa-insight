import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import { fetchDispositionSummary } from '@/lib/charts'
import type { UseDispositionChartReturn } from '@/types/charts'
import { useEffect, useState } from 'react'

export function useDispositionChart(): UseDispositionChartReturn & {
  isLoading: boolean
} {
  const queryString = useDateFilterParams()
  const [passed, setPassed] = useState(0)
  const [failed, setFailed] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const run = async () => {
      setIsLoading(true)
      try {
        const data = await fetchDispositionSummary(queryString)
        const overall = data.overall
        const p = Math.round(
          (overall.totalEmails * overall.overallPassRate) / 100,
        )
        setPassed(p)
        setFailed(overall.totalEmails - p)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    }
    void run()
  }, [queryString])

  return { passed, failed, isLoading }
}
