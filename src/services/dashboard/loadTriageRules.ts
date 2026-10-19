import { getAllowedDomainIds } from '@/services/auth'
import type { TriageRuleLoad, TriageWindowInput } from '@/types/dashboard'
import { resolveTriageWindow, unixDay } from '@/utils/dashboard'
import { getIngestionHealth } from './getIngestionHealth'
import { loadDomainPeriodTotals } from './loadDomainPeriodTotals'
import { newestReportDay } from './newestReportDay'
import { querySourcePeriodRows } from './querySourcePeriodRows'

/** Per-domain and per-source totals plus ingestion health for one window. */
export async function loadTriageRules(
  input: TriageWindowInput,
): Promise<TriageRuleLoad> {
  const window = resolveTriageWindow(input)
  const allowedIds = await getAllowedDomainIds()
  const [domains, sources] = await Promise.all([
    loadDomainPeriodTotals(window, allowedIds),
    querySourcePeriodRows(window, allowedIds),
  ])
  const ingestion = await getIngestionHealth(
    newestReportDay(domains),
    input.now.getTime(),
  )
  return {
    rules: {
      window,
      domains,
      sources,
      ingestion,
      todayDay: unixDay(input.now),
    },
    allowedIds,
  }
}
