import type { SenderIdentity } from '@/types/senders'
import type { IpSummaryData } from '../IpSummaryData'
import type { SourceCause } from './SourceCause'

/** One row of the sending sources list: totals, named sender and cause. */
export type IpSourceRow = IpSummaryData & {
  readonly sender: SenderIdentity | null
  readonly cause: SourceCause
}
