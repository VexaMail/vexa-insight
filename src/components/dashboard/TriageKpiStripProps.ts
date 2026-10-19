import type { TriageKpis, TriageWindow } from '@/types/dashboard'

export type TriageKpiStripProps = {
  readonly kpis: TriageKpis
  readonly window: TriageWindow
  readonly className?: string
}
