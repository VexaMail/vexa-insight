import type { AuthSummaryNarrative } from './AuthSummaryNarrative'

/**
 * Maps compliance rate to narrative status category.
 */
export function computeNarrativeStatus(
  complianceRate: number,
): AuthSummaryNarrative['status'] {
  if (complianceRate >= 95) return 'healthy'
  if (complianceRate >= 80) return 'degraded'
  return 'critical'
}
