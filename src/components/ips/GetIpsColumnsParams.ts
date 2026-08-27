import type { IpSummaryData } from '@/types/ips'

export type GetIpsColumnsParams = {
  refreshingIps: Set<string>
  localHostnames: Record<string, string | null>
  localHostnameLookupTimestamps: Record<string, number>
  handleRefresh: (e: React.MouseEvent, ip: string) => void
  ips: IpSummaryData[]
  setScope: (ids: string[]) => void
}
