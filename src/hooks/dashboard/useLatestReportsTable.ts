import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type { ReportRow } from '@/types/reports'
import { useEffect, useState } from 'react'

export function useLatestReportsTable() {
  const queryString = useDateFilterParams()
  const [reports, setReports] = useState<ReportRow[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const page = 'page=1&pageSize=15'
    const qs = queryString ? `${queryString}&${page}` : page

    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/v1/reports?${qs}`)
        const json = (await res.json()) as { data: { items: ReportRow[] } }
        setReports(json.data.items)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryString])

  return { reports, isLoading }
}
