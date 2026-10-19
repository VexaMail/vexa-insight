import type {
  FailingSourceAccumulator,
  FailingSourceSummary,
  SourcePeriodRow,
} from '@/types/dashboard'
import { addSourceRow } from './addSourceRow'

/**
 * Folds per-domain source rows into one row per IP: totals across domains,
 * the domain it fails most for, sorted by failing messages.
 */
export function summarizeFailingSources(
  rows: SourcePeriodRow[],
): FailingSourceSummary[] {
  const byIp = new Map<string, FailingSourceAccumulator>()
  for (const row of rows) {
    if (row.currentTotal > 0)
      byIp.set(row.ip, addSourceRow(byIp.get(row.ip), row))
  }
  return [...byIp.values()]
    .filter((s) => s.failed > 0)
    .sort((a, b) => b.failed - a.failed)
    .map(({ exampleFailed: _exampleFailed, ...summary }) => summary)
}
