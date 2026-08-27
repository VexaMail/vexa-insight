import type { InsightSeverity } from '@/types/ai'

/** Maps insight severity to a Tailwind border-left color class. */
export function severityColor(severity: InsightSeverity): string {
  const map: Record<InsightSeverity, string> = {
    critical: 'border-l-red-500',
    high: 'border-l-orange-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-blue-500',
    info: 'border-l-emerald-500',
  }
  return map[severity] ?? 'border-l-zinc-400'
}
