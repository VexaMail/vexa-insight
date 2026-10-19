import type { IpAuthCheck } from './IpAuthCheck'

export type IpAuthCheckRowProps = {
  readonly check: IpAuthCheck
  readonly total: number
  /** Where the row's chevron leads: the evidence behind the rate. */
  readonly href: string
}
