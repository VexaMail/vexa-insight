import type { InsightTone } from '@/types/ai'

export const TONE_DOT_STYLES: Record<InsightTone, string> = {
  improvement: 'bg-amber-500',
  anomaly: 'bg-sky-500',
  informational: 'bg-emerald-500',
}
