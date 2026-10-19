import type { IpNetworkEntry } from './IpNetworkEntry'

export type IpNetworkStoreState = {
  readonly byIp: Readonly<Record<string, IpNetworkEntry>>
  readonly setEntry: (ip: string, entry: IpNetworkEntry) => void
}
