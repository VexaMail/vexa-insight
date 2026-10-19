import type { KpiTileModel } from '@/types/dashboard'
import type { ReactNode } from 'react'

export type TriageKpiTileProps = {
  readonly model: KpiTileModel
  readonly icon: ReactNode
  readonly previousLabel: string | null
  /** `compact` for the two-column phone strip; `feature` otherwise. */
  readonly variant?: 'compact' | 'feature'
}
