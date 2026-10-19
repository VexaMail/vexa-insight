import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { changeDirection } from './changeDirection'
import { countDelta } from './countDelta'
import { formatCount } from './formatters/formatCount'
import { percentChange } from './percentChange'

/** Reported messages in the window, with a daily volume line. */
export function messagesTile(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel {
  const pct = percentChange(kpis.messages.current, kpis.messages.previous)
  return {
    label: 'Total email messages',
    value: formatCount(kpis.messages.current),
    tone: 'neutral',
    accent: 'info',
    delta: countDelta(kpis.messages),
    direction: changeDirection(pct, null),
    context: `reported, ${window.label}`,
    href: '/reports',
    trend: kpis.series.messages,
    trendKind: 'bars',
  }
}
