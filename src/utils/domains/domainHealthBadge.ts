import { DOMAIN_HEALTH_LABELS } from '@/constants/domains'
import { REPORT_STALE_DAYS } from '@/constants/gaps'
import type { DomainFreshnessInput, DomainHealthBadge } from '@/types/domains'
import { isReportCoverageStale } from '@/utils/gaps'
import { domainHealthTone } from './domainHealthTone'
import { getDomainHealth } from './getDomainHealth'

/**
 * A domain's status pill: its compliance band over all reports, but once it
 * has gone silent the band is history, so the pill turns neutral and says so.
 */
export function domainHealthBadge(
  row: DomainFreshnessInput,
  nowMs: number = Date.now(),
): DomainHealthBadge {
  const health = getDomainHealth(row)
  const band = DOMAIN_HEALTH_LABELS[health] ?? health
  const rate = `${row.passRatePercent.toFixed(1)}% pass DMARC over all reports`
  const stale =
    row.totalMessages > 0 && isReportCoverageStale(row.lastReportDay, nowMs)
  if (stale) {
    return {
      tone: 'unknown',
      label: `${band} · historical`,
      title: `No report for over ${String(REPORT_STALE_DAYS)} days: the last known result was ${rate}`,
      stale,
    }
  }
  const tone = domainHealthTone(health)
  const title = row.totalMessages > 0 ? rate : 'No mail reported yet'
  return { tone, label: band, title, stale }
}
