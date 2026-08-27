import type { InsightSeverity } from '@/types/ai'

/** Maps insight severity to a human-readable icon string. */
export function severityIcon(severity: InsightSeverity): string {
  const map: Record<InsightSeverity, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🔵',
    info: '✅',
  }
  return map[severity]
}
