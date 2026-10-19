import type { SparklineKind } from './SparklineKind'
import type { StatusTone } from './StatusTone'

export type SparklineProps = {
  /** Oldest first; one value per day or bucket. */
  readonly values: readonly number[]
  readonly kind?: SparklineKind
  readonly tone?: StatusTone
  readonly className?: string
  /** Accessible summary; the chart is decorative without it. */
  readonly label?: string
}
