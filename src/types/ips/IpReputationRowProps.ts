import type { ReactNode } from 'react'
import type { IpReputationStatus } from './IpReputationStatus'

export type IpReputationRowProps = {
  readonly label: string
  readonly status: IpReputationStatus
  /** Shown instead of the status label, e.g. a lookup button. */
  readonly action?: ReactNode
  readonly title?: string
}
