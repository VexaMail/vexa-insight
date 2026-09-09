import type { getReportById } from '@/services/reports'
import type { ReportAnalysisInput } from '../contracts'
import { getReportEventSummaries } from './getReportEventSummaries'

/** The prompt input for a stored report that has its XML. */
export function toReportAnalysisInput(
  report: NonNullable<Awaited<ReturnType<typeof getReportById>>>,
  rawXml: string,
): ReportAnalysisInput {
  return {
    reportId: report.id,
    orgName: report.orgName,
    beginDate: report.beginDate,
    endDate: report.endDate,
    rawXml,
    relatedDomains: report.relatedDomains ?? [],
    events: getReportEventSummaries(report.id),
  }
}
