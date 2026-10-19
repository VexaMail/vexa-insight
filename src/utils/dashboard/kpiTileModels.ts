import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { complianceTile } from './complianceTile'
import { domainsTile } from './domainsTile'
import { messagesTile } from './messagesTile'
import { reportsTile } from './reportsTile'

/** Messages, domains, DMARC compliance and reports, each with its trend. */
export function kpiTileModels(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel[] {
  return [
    messagesTile(kpis, window),
    domainsTile(kpis, window),
    complianceTile(kpis, window),
    reportsTile(kpis, window),
  ]
}
