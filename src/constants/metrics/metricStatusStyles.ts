import type { MetricStatus } from '@/types/metrics'

export const METRIC_STATUS_STYLES: Record<MetricStatus, string> = {
  healthy: 'border-success/30 bg-success/[0.06]',
  enforcing: 'border-success/30 bg-success/[0.06]',
  degraded: 'border-warning/35 bg-warning/[0.07]',
  monitoring: 'border-warning/35 bg-warning/[0.07]',
  critical: 'border-danger/35 bg-danger/[0.07]',
  missing: 'border-danger/35 bg-danger/[0.07]',
}
