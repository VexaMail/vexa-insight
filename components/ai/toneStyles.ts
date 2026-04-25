import type { InsightTone } from '@/types/ai'

export const TONE_STYLES: Record<InsightTone, string> = {
  improvement:
    'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200',
  anomaly:
    'border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-200',
  informational:
    'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
}
