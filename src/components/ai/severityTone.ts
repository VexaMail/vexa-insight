import type { InsightSeverity } from '@/types/ai'
import type { StatusTone } from '@/types/ui'

/** The status tone of an insight severity, for its icon and pill. */
export function severityTone(severity: InsightSeverity): StatusTone {
  const map: Record<InsightSeverity, StatusTone> = {
    critical: 'danger',
    high: 'danger',
    medium: 'warning',
    low: 'info',
    info: 'success',
  }
  return map[severity]
}
