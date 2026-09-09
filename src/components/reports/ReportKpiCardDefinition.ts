import type { MetricStatus } from '@/types/metrics'

export type ReportKpiCardDefinition = {
  readonly label: string
  readonly value: string
  readonly status: MetricStatus
}
