import type { FailureReason } from '@/types/domains'

export type ReasonRowProps = {
  readonly reason: FailureReason
  /** Failing messages the share is taken of. */
  readonly outOf: number
  readonly index: number
}
