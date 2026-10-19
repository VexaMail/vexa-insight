import type { SourceVerdict } from '@/types/source-reviews'

export type UseSourceReviewReturn = {
  readonly verdict: SourceVerdict | null
  readonly saving: boolean
  readonly error: string | null
  /** Null clears the verdict. */
  readonly setVerdict: (verdict: SourceVerdict | null) => void
}
