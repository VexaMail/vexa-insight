'use client'

import type { DnsCheckResponse, UseDnsCheckNowReturn } from '@/types/domains'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

/** Looks the domain's records up now, stores changes and reloads the tab. */
export function useDnsCheckNow(domainId: number): UseDnsCheckNowReturn {
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const checkNow = useCallback(() => {
    setChecking(true)
    void (async () => {
      try {
        const response = await fetch(
          `/api/v1/domains/${String(domainId)}/dns/check`,
          { method: 'POST' },
        )
        const body = (await response.json()) as DnsCheckResponse
        const changed = body.data?.changes?.length ?? 0
        setMessage(
          response.ok
            ? changed === 0
              ? 'No change since the last check'
              : `${String(changed)} record change${changed === 1 ? '' : 's'} stored`
            : 'The check failed',
        )
        router.refresh()
      } catch {
        setMessage('The check failed')
      } finally {
        setChecking(false)
      }
    })()
  }, [domainId, router])
  return { checking, message, checkNow }
}
