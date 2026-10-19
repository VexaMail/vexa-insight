import type {
  ReportKpiTileDefinition,
  ReportsWindowSummary,
  ReportsWindowTrends,
} from '@/types/reports'
import { formatPercent } from '@/utils/format'
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
  return [
    {
      id: 'reports',
      label: 'Reports in window',
      value: summary.reports.toLocaleString('en-US'),
      hint: `Aggregate reports, ${windowLabel}`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.reports,
      trendKind: 'bars',
    },
    {
      id: 'reporters',
      label: 'Reporters',
      value: summary.reporters.toLocaleString('en-US'),
      hint: `Receivers reporting on ${domains} ${summary.domains === 1 ? 'domain' : 'domains'}`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.reporters,
    },
    {
      id: 'messages',
      label: 'Messages',
      value: summary.messages.toLocaleString('en-US'),
      hint: 'Reported deliveries, not sends',
      tone: 'neutral',
      accent: 'info',
      trend: trends.messages,
      trendKind: 'bars',
    },
    {
      id: 'failing',
      label: 'Failing share',
      value: summary.messages === 0 ? 'No data' : formatPercent(share),
      hint: `${describeOutOf(summary.failingMessages, summary.messages, 'message')} fail DMARC`,
      tone: failingShareTone(share, summary.messages),
      trend: trends.failingShare,
    },
  ]
}
