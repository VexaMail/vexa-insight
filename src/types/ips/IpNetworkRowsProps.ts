import type { IpNetworkContext } from '@/types/ip-network'

export type IpNetworkRowsProps = {
  readonly context: IpNetworkContext | null
  readonly error: string | null
}
