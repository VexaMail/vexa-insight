import type { StatusTone } from '@/types/ui'

export type ScoreRingProps = {
  readonly percentage: number
  readonly tone: StatusTone
  /** `lg` for the score card, `sm` for a table row. */
  readonly size?: 'lg' | 'sm'
  /** Caption inside the ring; only shown at `lg`. */
  readonly label?: string
}
