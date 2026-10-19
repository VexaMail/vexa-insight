import type { IpNetworkContext } from '@/types/ip-network'

/** The live network lookup of one address, shared by every panel. */
export type IpNetworkEntry = {
  readonly context: IpNetworkContext | null
  readonly loading: boolean
  readonly error: string | null
}
