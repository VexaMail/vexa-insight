import type { InsightTone } from '@/types/ai'

export const TONE_STYLES: Record<InsightTone, string> = {
  improvement: 'border-warning/35 bg-warning/5 text-warning',
  anomaly: 'border-info/30 bg-info/5 text-info',
  informational: 'border-success/30 bg-success/5 text-success',
}
