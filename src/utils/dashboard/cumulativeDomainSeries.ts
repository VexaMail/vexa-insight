import type { TrendSeriesInput } from '@/types/dashboard'
import { DAY_SECONDS } from '@/utils/dates'

/** Domains first seen on or before the end of each bucket. */
export function cumulativeDomainSeries(input: TrendSeriesInput): number[] {
  const createdDays = input.domains.map((d) =>
    Math.floor(d.createdAtMs / 1000 / DAY_SECONDS),
  )
  return input.buckets.map(
    (b) => createdDays.filter((day) => day <= b.toDay).length,
  )
}
