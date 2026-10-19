import type { IpSourceRow } from '@/types/ips'

export type GetIpsColumnsParams = {
  refreshingIps: Set<string>
  localHostnames: Record<string, string | null>
  localHostnameLookupTimestamps: Record<string, number>
  handleRefresh: (e: React.MouseEvent, ip: string) => void
  ips: IpSourceRow[]
  setScope: (ids: string[]) => void
}
