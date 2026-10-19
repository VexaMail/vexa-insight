import { TREND_RANGE_DAYS } from '@/constants/dashboard'
import type { FilterOption, TriageWindow } from '@/types/dashboard'

/**
 * The trend chart's ranges, plus the page's own window when it is not one of
 * them (a custom range or all time), offered as "page".
 */
export function trendRangeOptions(window: TriageWindow): FilterOption[] {
  const presets = TREND_RANGE_DAYS.map((days) => ({
    value: String(days),
    label: `Last ${String(days)} days`,
  }))
  return presets.some((o) => o.label.toLowerCase() === window.label)
    ? presets
    : [...presets, { value: 'page', label: `Page range (${window.label})` }]
}
