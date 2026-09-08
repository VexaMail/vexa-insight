import { getDb } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { IngestResult } from '@/types/reports'
import { computeDailyRollupDeltas } from '@/utils/reports'
import { getOrCreateDomainId } from './getOrCreateDomainId'
import { insertRawReport } from './insertRawReport'
import { notifyUnauthorizedSources } from './notifyUnauthorizedSources'
import { resolveEventIpIds } from './resolveEventIpIds'
import { upsertRollupDeltas } from './upsertRollupDeltas'
import { writeReportEvents } from './writeReportEvents'

/**
 * Idempotent ingest: insert raw report and normalized events if report_id is new.
 * Returns whether the report was ingested or skipped as duplicate.
 */
export async function ingestParsedReport(
  report: ParseResult,
): Promise<IngestResult> {
  const db = getDb()
  const rawReportId = await insertRawReport(db, report.rawReport)
  if (rawReportId === null) {
    return { ingested: false, reason: 'duplicate_report_id' }
  }

  const domainId = await getOrCreateDomainId(db, report.domain)
  const ipAddressIds = await resolveEventIpIds(report.events)
  const rollupDeltas = computeDailyRollupDeltas(report.events)
  const now = new Date()

  // The callback MUST be synchronous (better-sqlite3 constraint); every await
  // above resolved before entering it.
  db.transaction((tx) => {
    writeReportEvents({
      tx,
      events: report.events,
      ipAddressIds,
      rawReportId,
      domainId,
      now,
    })
    upsertRollupDeltas(tx, domainId, rollupDeltas)
  })

  notifyUnauthorizedSources(report)

  return { ingested: true, rawReportId }
}
