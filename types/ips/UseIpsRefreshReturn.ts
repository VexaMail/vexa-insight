import type React from 'react'

export type UseIpsRefreshReturn = {
  localHostnames: Record<string, string | null>
  refreshingIps: Set<string>
  handleRefresh: (e: React.MouseEvent, ip: string) => void
}
