import type { CountComparison } from '@/types/dashboard'
import { formatSignedPercent } from './formatters/formatSignedPercent'
import { percentChange } from './percentChange'

/** "+12%" for a count against the previous period; null without a baseline. */
export function countDelta(count: CountComparison): string | null {
  const pct = percentChange(count.current, count.previous)
  return pct === null ? null : formatSignedPercent(pct)
}
