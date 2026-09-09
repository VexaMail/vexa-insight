import type { TopIpSender, UseTopIpSendersFetchReturn } from '@/types/dashboard'
import { useEffect, useState } from 'react'

/** Loads the top senders once on mount. */
export function useTopIpSendersFetch(): UseTopIpSendersFetchReturn {
  const [ips, setIps] = useState<TopIpSender[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/v1/stats/top-ips')
        const json = (await res.json()) as { data: TopIpSender[] }
        setIps(json.data)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { ips, setIps, isLoading }
}
