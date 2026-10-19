import type {
  DailyPassTotals,
  DayRange,
  RateTrendPoint,
} from '@/types/dashboard'
import { DAY_SECONDS, toIsoDayFromUnixSeconds } from '@/utils/dates'
import { dmarcPassRate } from './dmarcPassRate'
import { failRateOf } from './failRateOf'
import { roundRate } from './roundRate'

/**
 * One point per UTC report day of the range, pass and fail share of that
 * day's messages; a day without reports is a gap, not 0%. The all-time range
 * starts at the first day with data.
 */
export function buildRateTrend(
  days: DailyPassTotals[],
  range: DayRange,
): RateTrendPoint[] {
  const byDay = new Map(days.map((d) => [d.day, d]))
  const firstDataDay = days[0]?.day ?? range.toDay
  const start =
    range.fromDay === 0 ? Math.min(firstDataDay, range.toDay) : range.fromDay
  const points: RateTrendPoint[] = []
  for (let day = start; day <= range.toDay; day++) {
    const totals = byDay.get(day) ?? { day, total: 0, passed: 0 }
    points.push({
      date: toIsoDayFromUnixSeconds(day * DAY_SECONDS) ?? '',
      passRate: roundRate(dmarcPassRate(totals)),
      failRate: roundRate(failRateOf(totals)),
      total: totals.total,
    })
  }
  return points
}
