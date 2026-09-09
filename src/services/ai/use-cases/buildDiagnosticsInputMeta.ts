import type { DiagnosticsAnalysisResult } from '@/types/ai'
import type { DiagnosticsAnalysisInput } from '../contracts'

/** Which sources fed the analysis, for the result's consumers. */
export function buildDiagnosticsInputMeta(
  input: DiagnosticsAnalysisInput,
): DiagnosticsAnalysisResult['inputMeta'] {
  const { dns, stats, reportAggregate } = input
  return {
    domainName: input.domainName,
    hasDns: dns !== null,
    hasDiagnosticStats: stats !== null,
    hasReportAggregate: reportAggregate !== null,
    reportCount: reportAggregate?.reportCount,
    orgCount: reportAggregate?.orgCount,
    dateRange: reportAggregate?.dateRange
      ? {
          start: reportAggregate.dateRange.start ?? undefined,
          end: reportAggregate.dateRange.end ?? undefined,
        }
      : undefined,
  }
}
