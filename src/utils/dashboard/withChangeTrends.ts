import type { ChangeItem, TrendSeriesInput } from '@/types/dashboard'
import { changeTrend } from './changeTrend'

/** Attaches a sparkline series to each change that has one. */
export function withChangeTrends(
  items: readonly ChangeItem[],
  input: TrendSeriesInput,
): ChangeItem[] {
  return items.map((item) => {
    const trend = changeTrend(item, input)
    return trend && trend.length > 1 ? { ...item, trend } : item
  })
}
