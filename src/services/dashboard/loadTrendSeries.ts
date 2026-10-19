import type {
  DomainPeriodTotals,
  TrendSeriesInput,
  TriageWindow,
} from '@/types/dashboard'
import { seriesBuckets } from '@/utils/dashboard'
import { queryDailyReportCounts } from './queryDailyReportCounts'
import { queryDomainDailyTotals } from './queryDomainDailyTotals'

/** The daily rows and buckets behind the KPI and change sparklines. */
export async function loadTrendSeries(
  window: TriageWindow,
  allowedIds: number[] | null,
  domains: DomainPeriodTotals[],
): Promise<TrendSeriesInput> {
  const [daily, reports] = await Promise.all([
    queryDomainDailyTotals(window.current, allowedIds),
    queryDailyReportCounts(window.current, allowedIds),
  ])
  return {
    buckets: seriesBuckets(window.current, daily[0]?.day ?? null),
    daily,
    reports,
    domains,
  }
}
