import type { RateCheck } from '@/types/reports'
import { rateVerdict } from './rateVerdict'

/** The figure, pill and accent of one alignment-rate tile. */
export function rateCheck(rate: number, total: number): RateCheck {
  const verdict = rateVerdict(rate, total)
  return {
    value: total === 0 ? 'No data' : `${String(rate)}%`,
    verdict,
    accent: verdict?.tone ?? 'unknown',
  }
}
