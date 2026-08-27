'use client'

import type { UseIpsRefreshReturn } from '@/types/ips'
import { refreshIpHostname } from '@/utils/fetch'
import { useState } from 'react'
import { toast } from 'sonner'

export function useIpsRefresh(): UseIpsRefreshReturn {
  const [localHostnames, setLocalHostnames] = useState<
    Record<string, string | null>
  >({})
  const [localHostnameLookupTimestamps, setLocalHostnameLookupTimestamps] =
    useState<Record<string, number>>({})
  const [refreshingIps, setRefreshingIps] = useState<Set<string>>(new Set())

  const handleRefresh = (e: React.MouseEvent, ip: string): void => {
    e.preventDefault()
    e.stopPropagation()
    setRefreshingIps((prev) => new Set(prev).add(ip))

    const refresh = async () => {
      try {
        const result = await refreshIpHostname(ip)
        setLocalHostnames((prev) => ({ ...prev, [ip]: result.hostname }))
        const resolvedAtSeconds = result.resolvedAt
          ? Math.floor(new Date(result.resolvedAt).getTime() / 1000)
          : Math.floor(Date.now() / 1000)
        setLocalHostnameLookupTimestamps((prev) => ({
          ...prev,
          [ip]: resolvedAtSeconds,
        }))
        if (result.hostname) {
          toast.success(`Hostname resolved: ${result.hostname}`)
        } else {
          toast.warning(`No hostname found for ${ip}`, {
            description: result.error ?? result.status,
          })
        }
      } catch (err: unknown) {
        console.error('Failed to refresh hostname', err)
        toast.error(`Failed to refresh hostname for ${ip}`)
      } finally {
        setRefreshingIps((prev) => {
          const next = new Set(prev)
          next.delete(ip)
          return next
        })
      }
    }
    void refresh()
  }

  return {
    localHostnames,
    localHostnameLookupTimestamps,
    refreshingIps,
    handleRefresh,
  }
}
