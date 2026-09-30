import type { TlsReport } from '@/types/tlsrpt'
import { isJsonRecord } from './isJsonRecord'
import { parseRfc3339ToUnix } from './parseRfc3339ToUnix'
import { readJsonString } from './readJsonString'
import { readTlsReportPolicy } from './readTlsReportPolicy'

/**
 * Parses an SMTP TLS report (RFC 8460 section 4) from its JSON bytes.
 * Throws on malformed JSON or a missing required field.
 */
export function parseTlsReportJson(jsonBuffer: Buffer): TlsReport {
  const rawJson = jsonBuffer.toString('utf-8')
  const root: unknown = JSON.parse(rawJson)
  if (!isJsonRecord(root)) throw new TypeError('Invalid TLS-RPT: not an object')

  const reportId = readJsonString(root, 'report-id')
  const orgName = readJsonString(root, 'organization-name')
  if (reportId === null || orgName === null) {
    throw new TypeError(
      'Invalid TLS-RPT: missing report-id or organization-name',
    )
  }
  const range = isJsonRecord(root['date-range']) ? root['date-range'] : {}
  if (!Array.isArray(root['policies'])) {
    throw new TypeError('Invalid TLS-RPT: missing policies')
  }

  return {
    reportId,
    orgName,
    contactInfo: readJsonString(root, 'contact-info'),
    beginDate: parseRfc3339ToUnix(
      readJsonString(range, 'start-datetime'),
      'start-datetime',
    ),
    endDate: parseRfc3339ToUnix(
      readJsonString(range, 'end-datetime'),
      'end-datetime',
    ),
    policies: root['policies'].map(readTlsReportPolicy),
    rawJson,
  }
}
