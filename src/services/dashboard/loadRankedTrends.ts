import type {
  RankedRows,
  RankedTrends,
  TrendSeriesInput,
  TriageWindow,
} from '@/types/dashboard'
import { domainFailTrends, sourceFailTrends } from '@/utils/dashboard'
import { querySourceDailyFailures } from './querySourceDailyFailures'

/** Sparklines of the domains and sources the ranked tables list. */
export async function loadRankedTrends(
  series: TrendSeriesInput,
  window: TriageWindow,
  shown: RankedRows,
  allowedIds: number[] | null,
): Promise<RankedTrends> {
  const ips = shown.sources.map((s) => s.ip)
  const rows = await querySourceDailyFailures(ips, window.current, allowedIds)
  return {
    domains: domainFailTrends(series, shown.domains),
    sources: sourceFailTrends(rows, ips, series.buckets),
  }
}
