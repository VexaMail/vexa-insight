import type { FailingSourceSummary } from '@/types/dashboard'

export type FailingSourceRowProps = {
  readonly source: FailingSourceSummary
  /** Failing messages per day over the window, oldest first. */
  readonly trend: readonly number[] | undefined
}
