import type { SourceVerdict } from '@/types/source-reviews'

export type SourceReviewRowProps = {
  readonly ip: string
  readonly domain: string
  readonly messageCount: number
  readonly initialVerdict: SourceVerdict | null
}
