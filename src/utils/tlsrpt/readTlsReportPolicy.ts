import type { TlsFailureDetail, TlsReportPolicy } from '@/types/tlsrpt'
import { isJsonRecord } from './isJsonRecord'
import { readJsonCount } from './readJsonCount'
import { readJsonString } from './readJsonString'
import { readMxHosts } from './readMxHosts'
import { readTlsFailureDetail } from './readTlsFailureDetail'

/**
 * Reads one `policies[]` entry. Throws when the policy domain is missing,
 * since a row that cannot be attributed to a domain is useless.
 */
export function readTlsReportPolicy(value: unknown): TlsReportPolicy {
  if (!isJsonRecord(value)) throw new TypeError('Invalid TLS-RPT policy entry')
  const policy = isJsonRecord(value['policy']) ? value['policy'] : {}
  const summary = isJsonRecord(value['summary']) ? value['summary'] : {}
  const policyDomain = readJsonString(policy, 'policy-domain')
  if (policyDomain === null) {
    throw new TypeError('Invalid TLS-RPT policy: missing policy-domain')
  }
  const details = Array.isArray(value['failure-details'])
    ? value['failure-details']
    : []

  return {
    policyType: readJsonString(policy, 'policy-type') ?? 'no-policy-found',
    policyDomain: policyDomain.toLowerCase().replace(/\.$/, ''),
    mxHosts: readMxHosts(policy['mx-host']),
    successfulSessionCount: readJsonCount(
      summary,
      'total-successful-session-count',
    ),
    failedSessionCount: readJsonCount(summary, 'total-failure-session-count'),
    failureDetails: details
      .map(readTlsFailureDetail)
      .filter((d): d is TlsFailureDetail => d !== null),
  }
}
