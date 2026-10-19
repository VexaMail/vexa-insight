import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { formatCount } from './formatters/formatCount'

/** Monitored domains, with how many reported on each day as bars. */
export function domainsTile(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel {
  return {
    label: 'Monitored domains',
    value: formatCount(kpis.monitoredDomains),
    tone: 'neutral',
    delta: kpis.addedDomains > 0 ? `+${String(kpis.addedDomains)}` : null,
    direction: 'neutral',
    context: `${formatCount(kpis.reportingDomains)} reporting, ${window.label}`,
    href: '/domains',
    trend: kpis.series.reportingDomains,
    trendKind: 'bars',
  }
}
