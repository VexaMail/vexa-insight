import type {
  NormalizedEventPayload,
  ParseResult,
  RawReportPayload,
} from '@/types/dmarc'

import { assertSafeDmarcXml } from './assertSafeDmarcXml'
import { feedbackRecordList } from './feedbackRecordList'
import { parser } from './parser'
import { readReportMetadata } from './readReportMetadata'
import { recordToEvent } from './recordToEvent'
import { str } from './str'

/**
 * Parses DMARC aggregate report XML (RFC 7489) into ParseResult.
 * Uses safe XML parser; throws on invalid or missing required structure.
 */
export function parseDmarcXml(xmlBuffer: Buffer): ParseResult {
  const rawXml = xmlBuffer.toString('utf-8')
  assertSafeDmarcXml(rawXml)
  const obj = parser.parse(rawXml) as Record<string, unknown>
  const feedback = obj['feedback'] as Record<string, unknown> | undefined
  if (!feedback) {
    throw new Error('Invalid DMARC XML: missing feedback root')
  }

  const { reportId, orgName, email, beginTs, endTs } =
    readReportMetadata(feedback)

  const policy = feedback['policy_published'] as
    Record<string, unknown> | undefined
  const domain = str(policy?.['domain'] ?? '')

  const rawReport: RawReportPayload = {
    reportId,
    orgName,
    beginDate: beginTs,
    endDate: endTs,
    rawXml,
    sourceEmail: email || null,
  }

  const events: NormalizedEventPayload[] = feedbackRecordList(feedback).map(
    (rec) => recordToEvent(rec, beginTs, endTs),
  )

  return { rawReport, domain, events }
}
