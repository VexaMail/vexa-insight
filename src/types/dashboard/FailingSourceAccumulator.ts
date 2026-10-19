import type { FailingSourceSummary } from './FailingSourceSummary'

/** A summary being built, with the failing count of its example domain. */
export type FailingSourceAccumulator = FailingSourceSummary & {
  exampleFailed: number
}
