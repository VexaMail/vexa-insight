import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { getPublicSpfIssues } from './getPublicSpfIssues'
import { unknownPublicCheck } from './unknownPublicCheck'

export function buildPublicSpfCheck(records: string[][] | null): PublicCheck {
  if (records === null) return unknownPublicCheck('SPF')
  const policies = records
    .map((record) => record.join(''))
    .filter((record) => /^v=spf1(?:\s|$)/i.test(record))
  if (policies.length !== 1)
    return {
      name: 'SPF',
      status: 'attention',
      points: 0,
      summary:
        policies.length === 0
          ? 'No SPF record found.'
          : 'Multiple SPF records found.',
      recommendation:
        'A domain must publish at most one SPF record. Confirm its intended mail use with your provider.',
      records: policies,
    }
  const record = policies[0] ?? ''
  const issues = getPublicSpfIssues(record)
  const softfail = /(?:^|\s)~all(?:\s|$)/i.test(record)
  return {
    name: 'SPF',
    status: issues.length === 0 ? 'pass' : 'attention',
    points: issues.length === 0 ? 50 : 0,
    summary:
      issues.length === 0
        ? 'SPF policy published; basic record checks passed.'
        : 'The SPF policy needs attention.',
    recommendation:
      issues.length > 0
        ? issues.join(' ')
        : softfail
          ? '~all is a valid SoftFail policy, not a configuration error. Confirm legitimate senders before changing policy. Includes, redirects and DNS dependencies are not resolved by this check.'
          : 'This checks the published record. Includes, redirects and DNS dependencies are not resolved, and actual sender authentication requires message or DMARC report evidence.',
    records: policies,
  }
}
