import type { MetricStatus } from '@/types/metrics'

export const METRIC_VALUE_STYLES: Record<MetricStatus, string> = {
  healthy: 'text-success',
  enforcing: 'text-success',
  degraded: 'text-warning',
  monitoring: 'text-warning',
  critical: 'text-danger',
  missing: 'text-danger',
}
