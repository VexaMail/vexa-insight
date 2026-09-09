import type { TopIpSender, UseTopIpSendersTableReturn } from '@/types/dashboard'
import { refreshIpHostname } from '@/utils/fetch'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function useTopIpSendersTable(): UseTopIpSendersTableReturn {
  const [ips, setIps] = useState<TopIpSender[]>([])
  const [refreshingIps, setRefreshingIps] = useState<Set<string>>(new Set())
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

  const maxMessages = useMemo(() => {
    return Math.max(0, ...ips.map((ip) => ip.totalMessages))
  }, [ips])

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

  const handleRefreshClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const senderIp = event.currentTarget.dataset['senderIp']
    if (!senderIp) return

    void refreshHostname(senderIp)
  }

  return {
    ips,
    maxMessages,
    refreshingIps,
    handleRefreshClick,
    isLoading,
  }
}
