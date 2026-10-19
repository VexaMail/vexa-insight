import type { IpNetworkContext } from '@/types/ip-network'

export type IpNetworkResponse = {
  readonly data?: IpNetworkContext
  readonly error?: { readonly message?: string }
}
