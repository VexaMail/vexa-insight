import type { ActionSeverity } from '@/types/dashboard'

/** Sort key of a severity: critical first. */
export function severityRank(severity: ActionSeverity): number {
  if (severity === 'critical') return 0
  if (severity === 'warning') return 1
  return 2
}
