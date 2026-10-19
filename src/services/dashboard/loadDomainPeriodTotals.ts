import { getLastReportDays } from '@/services/gaps'
import type { DomainPeriodTotals, TriageWindow } from '@/types/dashboard'
import { queryDomainPeriodTotals } from './queryDomainPeriodTotals'

/** Per-domain period totals joined with each domain's last report day. */
export async function loadDomainPeriodTotals(
  window: TriageWindow,
  allowedIds: number[] | null,
): Promise<DomainPeriodTotals[]> {
  const [rows, lastDays] = await Promise.all([
    queryDomainPeriodTotals(window, allowedIds),
    getLastReportDays(),
  ])
  const lastById = new Map(lastDays.map((d) => [d.domainId, d.lastReportDay]))
  return rows.map((row) => ({
    domainId: row.domainId,
    domainName: row.domainName,
    createdAtMs: row.createdAt.getTime(),
    lastReportDay: lastById.get(row.domainId) ?? null,
    current: { total: row.currentTotal, passed: row.currentPassed },
    previous: { total: row.previousTotal, passed: row.previousPassed },
  }))
}
