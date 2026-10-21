import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { deriveDmarcSummary } from '../diagnostics/deriveDmarcSummary'
import { unknownPublicCheck } from './unknownPublicCheck'

export function buildPublicDmarcCheck(records: string[][] | null): PublicCheck {
  if (records === null) return unknownPublicCheck('DMARC')
  const policies = records.filter((record) =>
    /^v=DMARC1(?:;|$)/i.test(record.join('').trim()),
  )
  const dmarc = deriveDmarcSummary(policies)
  const valid = policies.length === 1 && dmarc.dmarcValid
  const enforced =
    valid &&
    (dmarc.dmarcPolicy === 'reject' || dmarc.dmarcPolicy === 'quarantine')
  return {
    name: 'DMARC',
    status: enforced ? 'pass' : 'attention',
    summary: valid
      ? `Published policy: ${dmarc.dmarcPolicy ?? 'unknown'}.`
      : 'A single valid DMARC policy was not found.',
    recommendation: enforced
      ? 'An enforcement policy is published. Monitor aggregate reports before changing it; DNS alone cannot prove alignment or full enforcement.'
      : 'Start collecting DMARC reports and identify legitimate senders before moving to quarantine or reject.',
    records: policies.map((record) => record.join('')),
  }
}
