import type { KpiTileModel, TriageKpis, TriageWindow } from '@/types/dashboard'
import { changeDirection } from './changeDirection'
import { countDelta } from './countDelta'
import { dmarcPassRate } from './dmarcPassRate'
import { formatCount } from './formatters/formatCount'
import { formatPointChange } from './formatters/formatPointChange'
import { formatRate } from './formatters/formatRate'
import { passRateDelta } from './passRateDelta'
import { passRateTone } from './passRateTone'
import { percentChange } from './percentChange'

/** Messages, domains, DMARC pass rate and reports, each with its denominator. */
export function kpiTileModels(
  kpis: TriageKpis,
  window: TriageWindow,
): KpiTileModel[] {
  const rate = dmarcPassRate(kpis.passCurrent)
  const rateDelta = passRateDelta(kpis)
  const msgPct = percentChange(kpis.messages.current, kpis.messages.previous)
  const repPct = percentChange(kpis.reports.current, kpis.reports.previous)
  return [
    {
      label: 'Email messages',
      value: formatCount(kpis.messages.current),
      tone: 'neutral',
      delta: countDelta(kpis.messages),
      direction: changeDirection(msgPct, null),
      context: `reported, ${window.label}`,
      href: '/reports',
    },
    {
      label: 'Monitored domains',
      value: formatCount(kpis.monitoredDomains),
      tone: 'neutral',
      delta: kpis.addedDomains > 0 ? `+${String(kpis.addedDomains)}` : null,
      direction: 'neutral',
      context: `${formatCount(kpis.reportingDomains)} reporting, ${window.label}`,
      href: '/domains',
    },
    {
      label: 'DMARC pass rate',
      value: formatRate(rate),
      tone: passRateTone(rate),
      delta: rateDelta === null ? null : formatPointChange(rateDelta),
      direction: changeDirection(rateDelta, true),
      context: `${formatCount(kpis.passCurrent.passed)} of ${formatCount(kpis.passCurrent.total)} messages, ${window.label}`,
      href: '/domains',
    },
    {
      label: 'Aggregate reports',
      value: formatCount(kpis.reports.current),
      tone: 'neutral',
      delta: countDelta(kpis.reports),
      direction: changeDirection(repPct, null),
      context: `received, ${window.label}`,
      href: '/reports',
    },
  ]
}
