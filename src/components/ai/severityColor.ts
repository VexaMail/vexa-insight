import type { InsightSeverity } from '@/types/ai'

/** Maps insight severity to a Tailwind border-left color class. */
export function severityColor(severity: InsightSeverity): string {
  const map: Record<InsightSeverity, string> = {
    critical: 'border-l-danger',
    high: 'border-l-danger',
    medium: 'border-l-warning',
    low: 'border-l-info',
    info: 'border-l-success',
  }
  return map[severity]
}
