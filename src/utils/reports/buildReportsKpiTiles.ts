import type {
  ReportKpiTileDefinition,
  ReportsWindowSummary,
} from '@/types/reports'
import { describeOutOf } from './describeOutOf'
import { failingShareTone } from './failingShareTone'
import { percentOf } from './percentOf'

/** Reports, reporters, messages and failing share of the list's window. */
export function buildReportsKpiTiles(
  summary: ReportsWindowSummary,
  windowLabel: string,
): ReportKpiTileDefinition[] {
  const share = percentOf(summary.failingMessages, summary.messages)
  return [
    {
      label: 'Reports in window',
      value: summary.reports.toLocaleString('en-US'),
      hint: `Aggregate reports, ${windowLabel}`,
      tone: 'neutral',
    },
    {
      label: 'Reporters',
      value: summary.reporters.toLocaleString('en-US'),
      hint: `Receivers reporting on ${summary.domains.toLocaleString('en-US')} ${summary.domains === 1 ? 'domain' : 'domains'}`,
      tone: 'neutral',
    },
    {
      label: 'Messages',
      value: summary.messages.toLocaleString('en-US'),
      hint: 'Reported deliveries, not sends',
      tone: 'neutral',
    },
    {
      label: 'Failing share',
      value: summary.messages === 0 ? 'No data' : `${String(share)}%`,
      hint: `${describeOutOf(summary.failingMessages, summary.messages, 'message')} fail DMARC`,
      tone: failingShareTone(share, summary.messages),
    },
  ]
}
