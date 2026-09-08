import { getDb } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { IngestResult } from '@/types/reports'
import { getOrCreateDomainId } from './getOrCreateDomainId'
import { hasRawReport } from './hasRawReport'
import { notifyUnauthorizedSources } from './notifyUnauthorizedSources'
import { resolveEventIpIds } from './resolveEventIpIds'
import { runIngestTransaction } from './runIngestTransaction'

/**
 * Idempotent ingest: stores the raw report and its normalized events when the
 * report_id is new. The raw row is written in the same transaction as the
 * events, so a failed ingest leaves nothing behind and a retry can succeed.
 */
export async function ingestParsedReport(
  report: ParseResult,
): Promise<IngestResult> {
  const db = getDb()
  if (hasRawReport(db, report.rawReport.reportId)) {
    return { ingested: false, reason: 'duplicate_report_id' }
  }

  // Both lookups are async and must resolve before the transaction opens:
  // better-sqlite3 transaction callbacks are synchronous.
  const domainId = await getOrCreateDomainId(db, report.domain)
  const ipAddressIds = await resolveEventIpIds(report.events)

  const result = runIngestTransaction(db, report, { domainId, ipAddressIds })
  if (result.ingested) notifyUnauthorizedSources(report)

  return result
}
