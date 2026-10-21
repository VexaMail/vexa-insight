import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { deriveSpfSummary } from '../diagnostics/deriveSpfSummary'
import { isNonSendingSpfRecord } from './isNonSendingSpfRecord'
import { unknownPublicCheck } from './unknownPublicCheck'

export function buildPublicSpfCheck(records: string[][] | null): PublicCheck {
  if (records === null) return unknownPublicCheck('SPF')
  const spf = deriveSpfSummary(records)
  const findings = spf.spfValidationCategories
    .flatMap((category) => category.checks)
    .filter(
      (check) =>
        !check.passed &&
        !(
          isNonSendingSpfRecord(spf.spf) &&
          check.name === 'Authorized senders defined'
        ),
    )
  const valid = spf.spfValid && !spf.spfWarning && findings.length === 0
  return {
    name: 'SPF',
    status: valid ? 'pass' : 'attention',
    summary: spf.spf ? 'Sender policy found.' : 'No SPF record found.',
    recommendation:
      spf.spfWarning ??
      findings[0]?.detail ??
      (valid
        ? 'A single sender policy is published. This check does not expand includes or prove that messages pass SPF.'
        : 'Review your SPF policy with your mail provider before making changes.'),
    records: records
      .map((record) => record.join(''))
      .filter((record) => record.startsWith('v=spf1')),
  }
}
