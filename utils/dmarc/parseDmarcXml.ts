import type {
  NormalizedEventPayload,
  ParseResult,
  RawReportPayload,
} from '@/types/dmarc'

import { num } from './num'
import { parser } from './parser'
import { recordToEvent } from './recordToEvent'
import { str } from './str'

/**
 * Parses DMARC aggregate report XML (RFC 7489) into ParseResult.
 * Uses safe XML parser; throws on invalid or missing required structure.
 */
export function parseDmarcXml(xmlBuffer: Buffer): ParseResult {
  const rawXml = xmlBuffer.toString('utf-8')
  if (/<!DOCTYPE/i.test(rawXml) || /<!ENTITY/i.test(rawXml)) {
    throw new Error('DMARC XML must not contain DOCTYPE or ENTITY declarations')
  }
  const obj = parser.parse(rawXml) as Record<string, unknown>
  const feedback = obj?.feedback as Record<string, unknown> | undefined
  if (!feedback) {
    throw new Error('Invalid DMARC XML: missing feedback root')
  }

  const metadata = feedback.report_metadata as
    Record<string, unknown> | undefined
  const reportId = str(metadata?.report_id ?? '')
  const orgName = str(metadata?.org_name ?? '')
  const email = str(metadata?.email ?? '')
  const dateRange = metadata?.date_range as Record<string, unknown> | undefined
  const beginTs = num(dateRange?.begin ?? 0)
  const endTs = num(dateRange?.end ?? 0)

  const policy = feedback.policy_published as
    Record<string, unknown> | undefined
  const domain = str(policy?.domain ?? '')

  const rawReport: RawReportPayload = {
    reportId,
    orgName,
    beginDate: beginTs,
    endDate: endTs,
    rawXml,
    sourceEmail: email || null,
  }

  const recordList = feedback.record
  const records: Record<string, unknown>[] = []
  if (Array.isArray(recordList)) {
    records.push(...recordList)
  } else if (recordList) {
    records.push(recordList as Record<string, unknown>)
  }
  const events: NormalizedEventPayload[] = records.map(
    (rec: Record<string, unknown>) => recordToEvent(rec, beginTs, endTs),
  )

  return { rawReport, domain, events }
}
