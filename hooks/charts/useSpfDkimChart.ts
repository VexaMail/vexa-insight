import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import { emptySpfDkimBreakdown, fetchSpfDkimBreakdown } from '@/lib/charts'
import type { UseSpfDkimChartReturn } from '@/types/charts'
import { useEffect, useState } from 'react'

export function useSpfDkimChart(): UseSpfDkimChartReturn & {
  isLoading: boolean
} {
  const queryString = useDateFilterParams()
  const [data, setData] = useState(emptySpfDkimBreakdown)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const run = async () => {
      setIsLoading(true)
      try {
        const breakdown = await fetchSpfDkimBreakdown(queryString)
        setData(breakdown)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    }
    void run()
  }, [queryString])

  return { data, isLoading }
}
