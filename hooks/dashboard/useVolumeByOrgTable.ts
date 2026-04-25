import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type { UseVolumeByOrgTableReturn } from '@/types/dashboard'
import type { VolumeByOrg } from '@/types/reports'
import { useEffect, useMemo, useState } from 'react'

export function useVolumeByOrgTable(): UseVolumeByOrgTableReturn {
  const queryString = useDateFilterParams()
  const [rows, setRows] = useState<VolumeByOrg[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const qs = queryString ? `?${queryString}` : ''

    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/v1/stats/by-org${qs}`)
        const json = (await res.json()) as { data: VolumeByOrg[] }
        setRows(json.data)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryString])

  const maxCount = useMemo(() => {
    return Math.max(0, ...rows.map((r) => r.reportCount))
  }, [rows])

  return { maxCount, rows, isLoading }
}
