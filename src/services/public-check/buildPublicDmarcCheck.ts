import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { buildPublishedDmarcCheck } from './buildPublishedDmarcCheck'
import { unknownPublicCheck } from './unknownPublicCheck'

export function buildPublicDmarcCheck(records: string[][] | null): PublicCheck {
  if (records === null) return unknownPublicCheck('DMARC')
  const policies = records
    .map((record) => record.join(''))
    .filter((record) => /^v\s*=\s*DMARC1(?:\s*;|$)/i.test(record.trim()))
  if (policies.length === 0)
    return {
      name: 'DMARC',
      status: 'unknown',
      points: null,
      summary: 'No direct DMARC record found at this name.',
      recommendation:
        'A subdomain may inherit its parent’s policy. Inheritance is not evaluated, so DMARC and the overall score remain unverified.',
      records: [],
    }
  if (policies.length > 1)
    return {
      name: 'DMARC',
      status: 'attention',
      points: 0,
      summary: 'Multiple DMARC records found.',
      recommendation:
        'Only one DMARC record may be published at this name. Confirm the intended policy with your provider.',
      records: policies,
    }
  return buildPublishedDmarcCheck(policies[0] ?? '')
}
