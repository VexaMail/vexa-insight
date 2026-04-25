import type { ExecutiveMetricCardProps } from './ExecutiveMetricCardProps'

export const METRIC_VALUE_STYLES: Record<
  ExecutiveMetricCardProps['status'],
  string
> = {
  healthy: 'text-emerald-700 dark:text-emerald-300',
  enforcing: 'text-emerald-700 dark:text-emerald-300',
  degraded: 'text-amber-700 dark:text-amber-300',
  monitoring: 'text-amber-700 dark:text-amber-300',
  critical: 'text-red-700 dark:text-red-300',
  missing: 'text-red-700 dark:text-red-300',
}
