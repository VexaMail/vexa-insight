import type { ReactNode } from 'react'
import type { IpDetailContext } from './IpDetailContext'
import type { IpDetailTab } from './IpDetailTab'

export type IpDetailViewProps = {
  readonly ctx: IpDetailContext
  readonly tab: IpDetailTab
  /** Back link and date range, placed in the header. */
  readonly actions: ReactNode
}
