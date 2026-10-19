import type { DailyVolumeRow } from '@/types/domains'

/** Daily rows as `days` values from `fromDay`, missing days counted as zero. */
export function toDailySeries(
  rows: readonly DailyVolumeRow[],
  fromDay: number,
  days: number,
): number[] {
  const series = Array.from({ length: days }, () => 0)
  for (const row of rows) {
    const index = row.day - fromDay
    if (index >= 0 && index < days) series[index] = row.total
  }
  return series
}
