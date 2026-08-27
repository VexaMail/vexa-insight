import { refreshIpHostname } from '@/utils/fetch'
import { useState } from 'react'
import { toast } from 'sonner'

export function useDomainSourcesRefresh() {
  const [localHostnames, setLocalHostnames] = useState<
    Record<string, string | null>
  >({})
  const [refreshingIps, setRefreshingIps] = useState<Set<string>>(new Set())

  const handleRefresh = async (sourceIp: string) => {
    setRefreshingIps((prev) => new Set(prev).add(sourceIp))
    try {
      const result = await refreshIpHostname(sourceIp)
      setLocalHostnames((prev) => ({ ...prev, [sourceIp]: result.hostname }))
      if (result.hostname) {
        toast.success(`Hostname resolved: ${result.hostname}`)
      } else {
        toast.warning(`No hostname found for ${sourceIp}`, {
          description: result.error ?? result.status,
        })
      }
    } catch (err) {
      console.error('Failed to refresh hostname', err)
      toast.error(`Failed to refresh hostname for ${sourceIp}`)
    } finally {
      setRefreshingIps((prev) => {
        const next = new Set(prev)
        next.delete(sourceIp)
        return next
      })
    }
  }

  return {
    localHostnames,
    refreshingIps,
    handleRefresh,
  }
}
