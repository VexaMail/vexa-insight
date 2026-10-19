import type { StatusTone } from '@/types/ui'
import type { IpEventStepKind } from './IpEventStepKind'

/** One stage of an event, ready to draw in the stepper. */
export type IpEventStepData = {
  readonly kind: IpEventStepKind
  readonly title: string
  readonly tone: StatusTone
  /** Result word shown as a pill, e.g. `pass` or `softfail`. */
  readonly verdict: string | null
  readonly lines: readonly string[]
  readonly href?: string
}
