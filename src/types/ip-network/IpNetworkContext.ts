import type { AsnInfo } from './AsnInfo'
import type { ForwardConfirmedRdns } from './ForwardConfirmedRdns'

export type IpNetworkContext = {
  readonly ip: string
  readonly rdns: ForwardConfirmedRdns
  /** Null when the lookup found no announcement or failed. */
  readonly asn: AsnInfo | null
}
