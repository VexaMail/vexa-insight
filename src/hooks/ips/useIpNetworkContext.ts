'use client'

import type { IpNetworkContext } from '@/types/ip-network'
import type { IpNetworkResponse, UseIpNetworkContextReturn } from '@/types/ips'
import { useCallback, useState } from 'react'

/** Asks for the live PTR check and ASN only when the operator wants them. */
export function useIpNetworkContext(ip: string): UseIpNetworkContextReturn {
  const [context, setContext] = useState<IpNetworkContext | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lookUp = useCallback(() => {
    setLoading(true)
    setError(null)
    void (async () => {
      try {
        const response = await fetch(
          `/api/v1/ips/${encodeURIComponent(ip)}/network`,
        )
        const body = (await response.json()) as IpNetworkResponse
        if (body.data) setContext(body.data)
        else setError(body.error?.message ?? 'Lookup failed')
      } catch {
        setError('Lookup failed')
      } finally {
        setLoading(false)
      }
    })()
  }, [ip])
  return { context, loading, error, lookUp }
}
