import type { StatusTone } from '@/types/ui'

export type ComplianceRingProps = {
  /** Percent, 0-100; null draws an empty ring. */
  readonly rate: number | null
  readonly tone: StatusTone
}
