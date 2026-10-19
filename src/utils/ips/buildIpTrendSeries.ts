import { IP_TREND_MAX_DAYS } from '@/constants/ips'
import type { IpDateRange } from '@/types/filters'
import type { IpDailyPoint, IpTrendSeries } from '@/types/ips'
import { computeRate } from './computeRate'
import { resolveTrendDays } from './resolveTrendDays'

/**
 * One value per UTC day of the window, oldest first, so a quiet day shows as
 * a gap rather than being skipped. At most the last `IP_TREND_MAX_DAYS` days.
 */
export function buildIpTrendSeries(
  points: readonly IpDailyPoint[],
  dateRange: IpDateRange,
): IpTrendSeries {
  const byDay = new Map(points.map((point) => [point.day, point]))
  const days = resolveTrendDays(points, dateRange, IP_TREND_MAX_DAYS)
  const at = (day: number) => byDay.get(day)
  const rate = (day: number, pick: (p: IpDailyPoint) => number) => {
    const point = at(day)
    return point ? computeRate(pick(point), point.total) : 0
  }
  return {
    volume: days.map((day) => at(day)?.total ?? 0),
    spfAuth: days.map((day) => rate(day, (p) => p.spfAuthPass)),
    dkimAuth: days.map((day) => rate(day, (p) => p.dkimAuthPass)),
    dmarc: days.map((day) => rate(day, (p) => p.dmarcPass)),
  }
}
