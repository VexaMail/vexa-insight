import type { InsightSeverity, InsightTone } from '@/types/ai'

/** Derives a sensible tone from severity when the AI omits tone. */
export function deriveToneFromSeverity(severity: InsightSeverity): InsightTone {
  if (severity === 'critical' || severity === 'high') return 'anomaly'
  if (severity === 'medium') return 'improvement'
  return 'informational'
}
