import type { PeriodTotals, TrendSeriesInput } from '@/types/dashboard'
import { bucketTotals } from './bucketTotals'

/**
 * A rate per bucket, skipping buckets without messages so a quiet day does
 * not read as a drop to zero.
 */
export function rateSeries(
  input: TrendSeriesInput,
  rate: (totals: PeriodTotals) => number | null,
  domainIds: ReadonlySet<number> | null = null,
): number[] {
  return input.buckets
    .map((b) => rate(bucketTotals(input.daily, b, domainIds)))
    .filter((value): value is number => value !== null)
}
