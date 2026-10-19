import type { SourceCause } from './SourceCause'
import type { SourceCauseCounts } from './SourceCauseCounts'

export type SourceCauseChipsProps = {
  readonly counts: SourceCauseCounts
  readonly total: number
  readonly active: SourceCause | null
  /** Link of each chip; `all` clears the filter. */
  readonly hrefs: Readonly<Record<SourceCause | 'all', string>>
}
