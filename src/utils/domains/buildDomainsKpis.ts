import type { DomainListRow, DomainsKpis } from '@/types/domains'
import { isReportCoverageStale } from '@/utils/gaps'
import { getDomainHealth } from './getDomainHealth'

/** The KPI strip figures of the domains list. */
export function buildDomainsKpis(
  rows: readonly DomainListRow[],
  nowMs = Date.now(),
): DomainsKpis {
  const count = (test: (row: DomainListRow) => boolean) =>
    rows.filter(test).length
  const health = (row: DomainListRow) => getDomainHealth(row)
  return {
    domains: rows.length,
    withData: count((row) => row.totalMessages > 0),
    messages: rows.reduce((total, row) => total + row.totalMessages, 0),
    passed: rows.reduce((total, row) => total + row.passedCount, 0),
    needAttention: count((r) => ['Warning', 'Critical'].includes(health(r))),
    silent: count((row) => isReportCoverageStale(row.lastReportDay, nowMs)),
    enforcing: count((row) =>
      ['quarantine', 'reject'].includes(row.policy?.policy ?? ''),
    ),
    withPolicy: count((row) => row.policy?.policy != null),
  }
}
