import type { InsightTone } from '@/types/ai'

export const TONE_DOT_STYLES: Record<InsightTone, string> = {
  improvement: 'bg-warning',
  anomaly: 'bg-info',
  informational: 'bg-success',
}
