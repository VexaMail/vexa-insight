import type { FailureReason } from '@/types/domains'

export type ReasonBarProps = {
  readonly reason: FailureReason
  readonly outOf: number
}
