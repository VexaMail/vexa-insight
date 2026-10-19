import type { ReactNode } from 'react'
import type { SparklineKind } from './SparklineKind'
import type { StatusTone } from './StatusTone'

export type StatTileProps = {
  readonly label: ReactNode
  readonly value: ReactNode
  /** Small line under the value: a denominator, a window, a comparison. */
  readonly hint?: ReactNode
  readonly tone?: StatusTone
  readonly icon?: ReactNode
  /**
   * `feature` puts the icon in a tinted square on the left and leaves room for
   * a trend; `compact` (default) is the dense label-over-figure tile.
   */
  readonly variant?: 'compact' | 'feature'
  /** Daily values, oldest first, drawn as a sparkline in a feature tile. */
  readonly trend?: readonly number[]
  readonly trendKind?: SparklineKind
  /** Tone of the icon square and sparkline; defaults to the value tone. */
  readonly accent?: StatusTone
  /** Whole tile becomes a link when set. */
  readonly href?: string
  readonly className?: string
}
