import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type { UseTopDomainsTableReturn } from '@/types/dashboard'
import type { DomainSummary } from '@/types/reports'
import { useEffect, useMemo, useState } from 'react'

export function useTopDomainsTable(): UseTopDomainsTableReturn & {
  isLoading: boolean
} {
  const queryString = useDateFilterParams()
  const [domains, setDomains] = useState<DomainSummary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const qs = queryString ? `?${queryString}` : ''

    void (async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/v1/domains/summary${qs}`)
        const json = (await res.json()) as {
          data: { domains: DomainSummary[] }
        }
        setDomains(json.data.domains)
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryString])

  return useMemo(() => {
    const topDomains = domains
      .slice()
      .sort((a, b) => b.totalMessages - a.totalMessages)
      .slice(0, 15)
    const maxMessages = Math.max(0, ...topDomains.map((d) => d.totalMessages))

    return { maxMessages, topDomains, isLoading }
  }, [domains, isLoading])
}
