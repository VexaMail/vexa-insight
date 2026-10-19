import type { IpDetailContext } from './IpDetailContext'

export type IpKpiTilesProps = {
  readonly ctx: IpDetailContext
  /** `compact` for the two-column phone grid; `feature` otherwise. */
  readonly variant: 'compact' | 'feature'
}
