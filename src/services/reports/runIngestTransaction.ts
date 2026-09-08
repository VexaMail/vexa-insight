import type { getDb } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { IngestResult } from '@/types/reports'
import { computeDailyRollupDeltas } from '@/utils/reports'
import { insertRawReport } from './insertRawReport'
import { upsertRollupDeltas } from './upsertRollupDeltas'
import { writeReportEvents } from './writeReportEvents'

/**
 * Writes the raw report, its normalized events and the daily rollups in one
 * synchronous better-sqlite3 transaction, so a failure anywhere leaves no raw
 * row behind and the report can be retried. Every async lookup (domain id, IP
 * ids) must already be resolved by the caller.
 */
export function runIngestTransaction(
  db: ReturnType<typeof getDb>,
  report: ParseResult,
  resolved: { domainId: number; ipAddressIds: number[] },
): IngestResult {
  const rollupDeltas = computeDailyRollupDeltas(report.events)
  const now = new Date()

  return db.transaction((tx): IngestResult => {
    const rawReportId = insertRawReport(tx, report.rawReport)
    if (rawReportId === null) {
      return { ingested: false, reason: 'duplicate_report_id' }
    }

    writeReportEvents({
      tx,
      events: report.events,
      ipAddressIds: resolved.ipAddressIds,
      rawReportId,
      domainId: resolved.domainId,
      now,
    })
    upsertRollupDeltas(tx, resolved.domainId, rollupDeltas)

    return { ingested: true, rawReportId }
  })
}
