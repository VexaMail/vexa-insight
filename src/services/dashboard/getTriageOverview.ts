import type { TriageOverview, TriageWindowInput } from '@/types/dashboard'
import {
  buildChangeList,
  buildKpiSeries,
  buildRateTrend,
  buildTriageKpis,
  resolveTriageWindow,
  summarizeFailingSources,
  withChangeTrends,
} from '@/utils/dashboard'
import { getIssueQueue } from './getIssueQueue'
import { loadReportCounts } from './loadReportCounts'
import { loadTrendSeries } from './loadTrendSeries'
import { queryDailyPassTotals } from './queryDailyPassTotals'

/**
 * Everything the home screen shows for one date filter: KPIs with their
 * sparklines, the active issues, the changes against the previous period, the
 * daily pass-rate trend (over its own range when one is picked), ingestion
 * health and the ranked tables, all over the same UTC report days.
 */
export async function getTriageOverview(
  input: TriageWindowInput,
  trendDays: number | null = null,
): Promise<TriageOverview> {
  const { issues, rules, allowedIds } = await getIssueQueue(input)
  const { window, domains, sources } = rules
  const trendWindow = trendDays
    ? resolveTriageWindow({ days: trendDays, now: input.now })
    : window
  const [series, daily, reports] = await Promise.all([
    loadTrendSeries(window, allowedIds, domains),
    queryDailyPassTotals(trendWindow.current, allowedIds),
    loadReportCounts(window, allowedIds),
  ])
  const active = issues.filter((issue) => issue.state === 'active')
  return {
    window,
    kpis: buildTriageKpis(domains, reports, window, buildKpiSeries(series)),
    actions: active,
    parkedIssues: issues.length - active.length,
    changes: withChangeTrends(buildChangeList(rules), series),
    trend: buildRateTrend(daily, trendWindow.current),
    trendLabel: trendWindow.label,
    ingestion: rules.ingestion,
    domains,
    failingSources: summarizeFailingSources(sources),
  }
}
