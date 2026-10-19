import type { ReactNode } from 'react'
import type { IpAuthCheck } from './IpAuthCheck'

export type IpRateTileProps = {
  readonly check: IpAuthCheck
  readonly total: number
  /** Daily pass rate, oldest first. */
  readonly trend: readonly number[]
  readonly icon: ReactNode
}
