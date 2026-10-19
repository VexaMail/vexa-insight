import type { SourceVerdict } from './SourceVerdict'

export type SourceReview = {
  readonly ip: string
  readonly domainName: string
  readonly verdict: SourceVerdict
  readonly note: string | null
  readonly reviewedByName: string | null
  /** Unix seconds. */
  readonly reviewedAt: number
}
