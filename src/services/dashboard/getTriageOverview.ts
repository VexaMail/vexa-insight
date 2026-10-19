import { getAllowedDomainIds } from '@/services/auth'
import type { TriageOverview, TriageWindowInput } from '@/types/dashboard'
import {
  buildActionQueue,
  buildChangeList,
  buildRateTrend,
  buildTriageKpis,
  resolveTriageWindow,
  summarizeFailingSources,
  unixDay,
} from '@/utils/dashboard'
import { getIngestionHealth } from './getIngestionHealth'
import { loadDomainPeriodTotals } from './loadDomainPeriodTotals'
import { loadReportCounts } from './loadReportCounts'
import { newestReportDay } from './newestReportDay'
import { queryDailyPassTotals } from './queryDailyPassTotals'
import { querySourcePeriodRows } from './querySourcePeriodRows'

/**
 * Everything the home screen shows for one date filter: KPIs, the action
 * queue, the changes against the previous period, the daily pass-rate trend,
 * ingestion health and the ranked tables, all over the same UTC report days.
 */
export async function getTriageOverview(
  input: TriageWindowInput,
): Promise<TriageOverview> {
  const window = resolveTriageWindow(input)
  const allowedIds = await getAllowedDomainIds()
  const [domains, sources, daily, reports] = await Promise.all([
    loadDomainPeriodTotals(window, allowedIds),
    querySourcePeriodRows(window, allowedIds),
    queryDailyPassTotals(window.current, allowedIds),
    loadReportCounts(window, allowedIds),
  ])
  const nowMs = input.now.getTime()
  const ingestion = await getIngestionHealth(newestReportDay(domains), nowMs)
  const rules = {
    window,
    domains,
    sources,
    ingestion,
    todayDay: unixDay(input.now),
  }
  return {
    window,
    kpis: buildTriageKpis(domains, reports, window),
    actions: buildActionQueue(rules),
    changes: buildChangeList(rules),
    trend: buildRateTrend(daily, window.current),
    ingestion,
    domains,
    failingSources: summarizeFailingSources(sources),
  }
}
