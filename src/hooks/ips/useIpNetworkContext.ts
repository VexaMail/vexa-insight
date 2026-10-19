'use client'

import type { IpNetworkResponse, UseIpNetworkContextReturn } from '@/types/ips'
import { useCallback } from 'react'
import { useIpNetworkStore } from './useIpNetworkStore'

/** Asks for the live PTR check and ASN only when the operator wants them. */
export function useIpNetworkContext(ip: string): UseIpNetworkContextReturn {
  const entry = useIpNetworkStore((state) => state.byIp[ip])
  const setEntry = useIpNetworkStore((state) => state.setEntry)
  const lookUp = useCallback(() => {
    const previous = useIpNetworkStore.getState().byIp[ip]?.context ?? null
    setEntry(ip, { context: previous, loading: true, error: null })
    void (async () => {
      try {
        const response = await fetch(
          `/api/v1/ips/${encodeURIComponent(ip)}/network`,
        )
        const body = (await response.json()) as IpNetworkResponse
        setEntry(ip, {
          context: body.data ?? previous,
          loading: false,
          error: body.data ? null : (body.error?.message ?? 'Lookup failed'),
        })
      } catch {
        setEntry(ip, { context: previous, loading: false, error: 'Lookup failed' })
      }
    })()
  }, [ip, setEntry])
  return {
    context: entry?.context ?? null,
    loading: entry?.loading ?? false,
    error: entry?.error ?? null,
    lookUp,
  }
}
