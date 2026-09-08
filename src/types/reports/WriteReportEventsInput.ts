import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from './ReportTransaction'

/** Everything the per-event writer needs inside the ingest transaction. */
export type WriteReportEventsInput = {
  tx: ReportTransaction
  events: ParseResult['events']
  ipAddressIds: readonly number[]
  rawReportId: number
  domainId: number
  now: Date
}
