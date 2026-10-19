import type { KpiTileModel } from '@/types/dashboard'
import type { ReactNode } from 'react'

export type TriageKpiTileProps = {
  readonly model: KpiTileModel
  readonly icon: ReactNode
  readonly previousLabel: string | null
}
