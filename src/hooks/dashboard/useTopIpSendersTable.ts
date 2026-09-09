import type { UseTopIpSendersTableReturn } from '@/types/dashboard'
import { useMemo } from 'react'
import { useRefreshIpHostname } from './useRefreshIpHostname'
import { useTopIpSendersFetch } from './useTopIpSendersFetch'

export function useTopIpSendersTable(): UseTopIpSendersTableReturn {
  const { ips, setIps, isLoading } = useTopIpSendersFetch()
  const { refreshingIps, refreshHostname } = useRefreshIpHostname(setIps)

  const maxMessages = useMemo(() => {
    return Math.max(0, ...ips.map((ip) => ip.totalMessages))
  }, [ips])

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
