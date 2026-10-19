import type { StatusTone } from '@/types/ui'
import type { ChangeDirection } from './ChangeDirection'

/** One KPI tile: figure, what it is out of, and its change. */
export type KpiTileModel = {
  label: string
  value: string
  tone: StatusTone
  /** Change against the previous period, e.g. "+12%"; null without one. */
  delta: string | null
  direction: ChangeDirection
  /** Denominator and window, e.g. "of 24,802 messages, last 30 days". */
  context: string
  href: string
}
