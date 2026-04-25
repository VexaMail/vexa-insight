import type { InsightTone } from '@/types/ai'

import { TONE_DOT_STYLES } from './toneDotStyles'

/** Returns the Tailwind class for a tone indicator dot. */
export function insightToneDot(tone: InsightTone): string {
  return TONE_DOT_STYLES[tone]
}
