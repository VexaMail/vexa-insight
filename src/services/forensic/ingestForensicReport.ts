import { FORENSIC_DAILY_CAP_PER_DOMAIN } from '@/constants/forensic'
import { getDb } from '@/lib/db'
import type { ForensicIngestResult, ForensicReport } from '@/types/forensic'
import { countForensicReportsForDay } from './countForensicReportsForDay'
import { insertForensicReport } from './insertForensicReport'
import { notifyForensicReport } from './notifyForensicReport'

/**
 * Stores one failure report unless its mail was already stored or its domain
 * reached the daily cap, and notifies webhooks of a newly stored one.
 */
export function ingestForensicReport(
  report: ForensicReport,
): ForensicIngestResult {
  const result = getDb().transaction((tx): ForensicIngestResult => {
    const storedToday = countForensicReportsForDay(
      tx,
      report.reportedDomain,
      report.arrivalDate,
    )
    if (storedToday >= FORENSIC_DAILY_CAP_PER_DOMAIN) {
      return { ingested: false, reason: 'daily_cap' }
    }
    const forensicReportId = insertForensicReport(tx, report)
    if (forensicReportId === null)
      return { ingested: false, reason: 'duplicate' }
    return { ingested: true, forensicReportId }
  })
  if (result.ingested) notifyForensicReport(report)
  return result
}
