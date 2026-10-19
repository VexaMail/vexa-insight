import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { formatScopeLabel } from '@/utils/format'
import { changeDirection } from './changeDirection'
import { dmarcPassRate } from './dmarcPassRate'
import { formatCount } from './formatters/formatCount'
import { formatPointChange } from './formatters/formatPointChange'
import { formatRate } from './formatters/formatRate'
import { passRateDelta } from './passRateDelta'
import { passRateTone } from './passRateTone'
import { sparklineShape } from './sparklineShape'

/** The DMARC pass rate across every visible domain, with its daily line. */
export function complianceTile(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel {
  const rate = dmarcPassRate(kpis.passCurrent)
  const delta = passRateDelta(kpis)
  return {
    label: 'Overall compliance',
    value: formatRate(rate),
    tone: passRateTone(rate),
    accent: 'success',
    delta: delta === null ? null : formatPointChange(delta),
    direction: changeDirection(delta, true),
    context: `${formatScopeLabel(window.label)} · ${formatCount(kpis.passCurrent.passed)} of ${formatCount(kpis.passCurrent.total)} pass DMARC`,
    href: '/domains',
    trend: sparklineShape(kpis.series.passRate),
    trendKind: 'line',
  }
}
