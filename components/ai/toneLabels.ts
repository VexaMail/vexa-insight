import type { InsightTone } from '@/types/ai'

export const TONE_LABELS: Record<InsightTone, string> = {
  improvement: 'Improvement',
  anomaly: 'Anomaly',
  informational: 'Informational',
}
