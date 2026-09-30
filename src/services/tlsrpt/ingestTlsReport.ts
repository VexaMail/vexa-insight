import { getDb } from '@/lib/db'
import type { TlsIngestResult, TlsReport } from '@/types/tlsrpt'
import { insertTlsReport } from './insertTlsReport'
import { insertTlsReportPolicy } from './insertTlsReportPolicy'
import { notifyTlsFailures } from './notifyTlsFailures'

/**
 * Idempotent ingest of one TLS report: the report, its policies and their
 * failure details are written in one transaction, and the failure webhook
 * fires only for a report stored for the first time.
 */
export function ingestTlsReport(report: TlsReport): TlsIngestResult {
  const db = getDb()
  const result = db.transaction((tx): TlsIngestResult => {
    const tlsReportId = insertTlsReport(tx, report)
    if (tlsReportId === null) {
      return { ingested: false, reason: 'duplicate_report_id' }
    }
    for (const policy of report.policies) {
      insertTlsReportPolicy(tx, tlsReportId, policy)
    }
    return { ingested: true, tlsReportId }
  })
  if (result.ingested) notifyTlsFailures(report)
  return result
}
