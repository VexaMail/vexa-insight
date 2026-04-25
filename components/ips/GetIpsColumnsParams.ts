import type { IpSummaryData } from '@/types/ips'

export type GetIpsColumnsParams = {
  refreshingIps: Set<string>
  localHostnames: Record<string, string | null>
  handleRefresh: (e: React.MouseEvent, ip: string) => void
  ips: IpSummaryData[]
  setScope: (ids: string[]) => void
}
