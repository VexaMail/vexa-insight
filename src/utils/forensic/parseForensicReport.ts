import type { ForensicReport } from '@/types/forensic'
import { domainOfAddress } from './domainOfAddress'
import { firstHeader } from './firstHeader'
import { firstHeaderLower } from './firstHeaderLower'
import { parseHeaderBlock } from './parseHeaderBlock'
import { readArrivalDate } from './readArrivalDate'
import { readAuthResults } from './readAuthResults'
import { readDkimIdentity } from './readDkimIdentity'
import { readReporterAuthResults } from './readReporterAuthResults'
import { readReportingMta } from './readReportingMta'
import { readSourceIp } from './readSourceIp'
import { trimAngleBrackets } from './trimAngleBrackets'

/**
 * Parses a DMARC failure report from its `message/feedback-report` part and,
 * when the report carries it, the reported message's header section. Throws
 * when neither names the domain the report is about.
 */
export function parseForensicReport(
  feedbackText: string,
  headersText: string | null,
  now = Date.now(),
): ForensicReport {
  const feedback = parseHeaderBlock(feedbackText)
  const headers = parseHeaderBlock(headersText ?? '')
  const authResults = firstHeader(feedback, 'authentication-results')
  const headerFromDomain = domainOfAddress(firstHeader(headers, 'from'))
  const reportedDomain =
    firstHeaderLower(feedback, 'reported-domain') ?? headerFromDomain
  if (reportedDomain === null) {
    throw new TypeError('Invalid failure report: no Reported-Domain or From')
  }
  const reportingMta = readReportingMta(
    firstHeader(feedback, 'reporting-mta'),
    authResults,
  )
  const reporterAuthResults = readReporterAuthResults(headers, reportingMta)

  return {
    reportedDomain,
    feedbackType: firstHeaderLower(feedback, 'feedback-type') ?? 'auth-failure',
    authFailure: firstHeaderLower(feedback, 'auth-failure'),
    sourceIp: readSourceIp(firstHeader(feedback, 'source-ip')),
    reportingMta,
    arrivalDate: readArrivalDate(
      firstHeader(feedback, 'arrival-date'),
      firstHeader(headers, 'date'),
      now,
    ),
    headerFromDomain,
    envelopeFromDomain: domainOfAddress(
      firstHeader(feedback, 'original-mail-from'),
    ),
    ...readDkimIdentity(feedback, headers),
    ...readAuthResults(
      [authResults, reporterAuthResults].filter((v) => v !== null).join('; ') ||
        null,
    ),
    originalMessageId: trimAngleBrackets(firstHeader(headers, 'message-id')),
    listId: trimAngleBrackets(firstHeader(headers, 'list-id')),
  }
}
