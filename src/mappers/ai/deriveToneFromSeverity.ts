import type { InsightSeverity, InsightTone } from '@/types/ai'

export function deriveToneFromSeverity(severity: InsightSeverity): InsightTone {
  if (severity === 'high' || severity === 'critical') return 'anomaly'
  if (severity === 'low') return 'informational'
  return 'improvement'
}
