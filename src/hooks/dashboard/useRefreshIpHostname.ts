import type { TopIpSender, UseRefreshIpHostnameReturn } from '@/types/dashboard'
import { refreshIpHostname } from '@/utils/fetch'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

/** Re-resolves one sender's hostname and writes it back into the list. */
export function useRefreshIpHostname(
  setIps: Dispatch<SetStateAction<TopIpSender[]>>,
): UseRefreshIpHostnameReturn {
  const [refreshingIps, setRefreshingIps] = useState<Set<string>>(new Set())

  const refreshHostname = async (senderIp: string) => {
    setRefreshingIps((prev) => new Set(prev).add(senderIp))
    try {
      const result = await refreshIpHostname(senderIp)
      if (result.hostname) {
        setIps((prev) =>
          prev.map((s) =>
            s.ip === senderIp ? { ...s, hostname: result.hostname } : s,
          ),
        )
        toast.success(`Hostname resolved: ${result.hostname}`)
      } else {
        toast.warning(`No hostname found for ${senderIp}`, {
          description: result.error ?? result.status,
        })
      }
    } catch (err) {
      console.error('Failed to refresh hostname', err)
      toast.error(`Failed to refresh hostname for ${senderIp}`)
    } finally {
      setRefreshingIps((prev) => {
        const next = new Set(prev)
        next.delete(senderIp)
        return next
      })
    }
  }

  return { refreshingIps, refreshHostname }
}
