import type { Actor } from '@/types/issues'
import type { SourceVerdict } from './SourceVerdict'

export type SetSourceReviewInput = {
  readonly ip: string
  readonly domainName: string
  readonly verdict: SourceVerdict
  readonly note?: string | null | undefined
  readonly actor: Actor | null
}
