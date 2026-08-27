import type { MetricStatus } from '@/types/metrics'

export const METRIC_STATUS_STYLES: Record<MetricStatus, string> = {
  healthy:
    'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950',
  enforcing:
    'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950',
  degraded:
    'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950',
  monitoring:
    'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950',
  critical: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
  missing: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
}
