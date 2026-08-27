import type { InsightSeverity } from '@/types/ai'

export const SEVERITY_ORDER: Record<InsightSeverity, number> = {
  critical: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
}
