import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { formatScopeLabel } from '@/utils/format'
import { changeDirection } from './changeDirection'
import { countDelta } from './countDelta'
import { formatCount } from './formatters/formatCount'
import { percentChange } from './percentChange'

/** Aggregate reports received in the window, with daily counts as bars. */
export function reportsTile(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel {
  const pct = percentChange(kpis.reports.current, kpis.reports.previous)
  return {
    label: 'Reports processed',
    value: formatCount(kpis.reports.current),
    tone: 'neutral',
    accent: 'info',
    delta: countDelta(kpis.reports),
    direction: changeDirection(pct, null),
    context: `${formatScopeLabel(window.label)} · aggregate reports`,
    href: '/reports',
    trend: kpis.series.reports,
    trendKind: 'bars',
  }
}
