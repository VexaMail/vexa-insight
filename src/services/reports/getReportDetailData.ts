import type { ReportDetailData } from '@/types/reports'
import { getReportById } from './getReportById'
import { getReportHistory } from './getReportHistory'
import { getReportSources } from './getReportSources'
import { getReportStats } from './getReportStats'

/** The report, its stats, sources and receiver history; null when absent. */
export async function getReportDetailData(
  reportId: number,
): Promise<ReportDetailData | null> {
  const [report, stats, sources] = await Promise.all([
    getReportById(reportId),
    getReportStats(reportId),
    getReportSources(reportId),
  ])
  if (!report) return null
  const history = await getReportHistory(report)
  return { report, stats, sources, history }
}
