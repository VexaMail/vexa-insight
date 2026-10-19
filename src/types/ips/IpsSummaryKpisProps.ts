import type { IpsKpis } from '../IpsKpis'

export type IpsSummaryKpisProps = {
  readonly kpis: IpsKpis
  readonly failingHref: string
  /** The window the figures cover, e.g. "last 30 days". */
  readonly windowLabel: string
}
