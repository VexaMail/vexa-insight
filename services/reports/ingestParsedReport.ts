import {
  getDb,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { upsertIp } from '@/services/geoip'
import { fireAndForgetDispatch } from '@/services/notifications'
import type { ParseResult } from '@/types/dmarc'
import type { IngestResult } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { getOrCreateDomainId } from './getOrCreateDomainId'

/**
 * Idempotent ingest: insert raw report and normalized events if report_id is new.
 * Returns whether the report was ingested or skipped as duplicate.
 */
export async function ingestParsedReport(
  report: ParseResult,
): Promise<IngestResult> {
  const db = getDb()
  const existing = await db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(eq(rawReports.reportId, report.rawReport.reportId))
    .limit(1)
  if (existing.length > 0) {
    return { ingested: false, reason: 'duplicate_report_id' }
  }

  const inserted = await db
    .insert(rawReports)
    .values({
      reportId: report.rawReport.reportId,
      orgName: report.rawReport.orgName,
      beginDate: report.rawReport.beginDate,
      endDate: report.rawReport.endDate,
      rawXml: report.rawReport.rawXml,
      sourceEmail: report.rawReport.sourceEmail,
      sourceMessageId: report.rawReport.sourceMessageId,
      ingestedAt: new Date(),
    })
    .returning({ id: rawReports.id })
  const rawReportId = inserted[0]?.id
  if (rawReportId == null) {
    throw new Error('Failed to insert raw report')
  }

  const domainId = await getOrCreateDomainId(db, report.domain)
  const now = new Date()

  // Resolve all async IP upserts BEFORE entering the transaction.
  // SQLite transactions (better-sqlite3) must be synchronous; an async
  // callback causes the "Transaction function cannot return a promise" error.
  const ipAddressIds = await Promise.all(
    report.events.map((ev) => upsertIp(ev.sourceIp)),
  )

  // Use a transaction since we are inserting into multiple tables per event.
  // The callback MUST be synchronous (better-sqlite3 constraint).
  // All async work (upsertIp) was resolved above before entering here.
  db.transaction((tx) => {
    for (const [i, ev] of report.events.entries()) {
      const ipAddressId =
        ipAddressIds[i] ??
        (() => {
          throw new Error(`Missing ipAddressId for index ${i}`)
        })()

      const insertedEvent = tx
        .insert(normalizedEvents)
        .values({
          rawReportId,
          domainId,
          ipAddressId,
          spfResult: ev.spfResult,
          dkimResult: ev.dkimResult,
          spfAuthResult: ev.spfAuthResult,
          spfAligned: ev.spfAligned,
          dkimAligned: ev.dkimAligned,
          disposition: ev.disposition,
          count: ev.count,
          reportBeginDate: ev.reportBeginDate,
          reportEndDate: ev.reportEndDate,
          createdAt: now,
        })
        .returning({ id: normalizedEvents.id })
        .get()

      const eventId = insertedEvent?.id
      if (!eventId) continue

      if (ev.dkimAuthResults.length > 0) {
        tx.insert(normalizedEventDkimResults)
          .values(
            ev.dkimAuthResults.map((dkim) => ({
              eventId,
              domain: dkim.domain,
              selector: dkim.selector,
              result: dkim.result,
              isAligned: dkim.isAligned,
            })),
          )
          .run()
      }

      if (ev.policyOverrides.length > 0) {
        tx.insert(normalizedEventPolicyOverrides)
          .values(
            ev.policyOverrides.map((override) => ({
              eventId,
              type: override.type,
              comment: override.comment,
            })),
          )
          .run()
      }
    }
  })

  const unauthorizedIps = Array.from(
    new Set(
      report.events
        .filter((ev) => !ev.spfAligned && !ev.dkimAligned)
        .map((ev) => ev.sourceIp),
    ),
  )
  if (unauthorizedIps.length > 0) {
    fireAndForgetDispatch('unauthorized_source.detected', {
      domain: report.domain,
      reportId: report.rawReport.reportId,
      reportingOrg: report.rawReport.orgName,
      unauthorizedIps,
      reportBeginDate: report.rawReport.beginDate,
      reportEndDate: report.rawReport.endDate,
    })
  }

  return { ingested: true, rawReportId }
}
