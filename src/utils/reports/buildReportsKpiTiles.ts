import type {
  ReportKpiTileDefinition,
  ReportsWindowSummary,
  ReportsWindowTrends,
} from '@/types/reports'
import { formatScopeLabel } from '@/utils/format'
import { describeOutOf } from './describeOutOf'
import { failingShareTone } from './failingShareTone'
import { percentOf } from './percentOf'

/** Reports, reporters, messages and failing share of the list's window. */
export function buildReportsKpiTiles(
  summary: ReportsWindowSummary,
  trends: ReportsWindowTrends,
  windowLabel: string,
): ReportKpiTileDefinition[] {
  const share = percentOf(summary.failingMessages, summary.messages)
  const domains = summary.domains.toLocaleString('en-US')
  const scope = formatScopeLabel(windowLabel)
  return [
    {
      id: 'reports',
      label: 'Reports in window',
      value: summary.reports.toLocaleString('en-US'),
      hint: `${scope} · aggregate reports`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.reports,
      trendKind: 'bars',
    },
    {
      id: 'reporters',
      label: 'Reporters',
      value: summary.reporters.toLocaleString('en-US'),
      hint: `${scope} · reporting on ${domains} ${summary.domains === 1 ? 'domain' : 'domains'}`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.reporters,
    },
    {
      id: 'messages',
      label: 'Messages',
      value: summary.messages.toLocaleString('en-US'),
      hint: `${scope} · reported deliveries, not sends`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.messages,
      trendKind: 'bars',
    },
    {
      id: 'failing',
      label: 'Failing share',
      value: summary.messages === 0 ? 'No data' : `${String(share)}%`,
      hint: `${scope} · ${describeOutOf(summary.failingMessages, summary.messages, 'message')} fail DMARC`,
      tone: failingShareTone(share, summary.messages),
      trend: trends.failingShare,
    },
  ]
}
