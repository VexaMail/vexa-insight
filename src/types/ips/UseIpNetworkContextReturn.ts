import type { IpNetworkContext } from '@/types/ip-network'

export type UseIpNetworkContextReturn = {
  readonly context: IpNetworkContext | null
  readonly loading: boolean
  readonly error: string | null
  readonly lookUp: () => void
}
