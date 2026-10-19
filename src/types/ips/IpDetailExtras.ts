import type { SourceReview } from '@/types/source-reviews'
import type { IpDailyPoint } from './IpDailyPoint'
import type { IpRawRecord } from './IpRawRecord'

/** What a source page loads besides the report aggregates. */
export type IpDetailExtras = {
  readonly reviews: readonly SourceReview[]
  readonly daily: readonly IpDailyPoint[]
  readonly rawRecords: readonly IpRawRecord[] | null
}
