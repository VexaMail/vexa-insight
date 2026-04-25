import type { ExecutiveMetricCardProps } from './ExecutiveMetricCardProps'

/** Maps alignment rate to a status for metric card coloring. */
export function deriveAlignmentStatus(
  rate: number,
): ExecutiveMetricCardProps['status'] {
  if (rate >= 95) return 'healthy'
  if (rate >= 80) return 'degraded'
  return 'critical'
}
