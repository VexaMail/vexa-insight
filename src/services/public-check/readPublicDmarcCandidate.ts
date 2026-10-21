import type { PublicDmarcCandidate } from '../../types/public-check/PublicDmarcCandidate'
import { parsePublicDmarcPolicy } from './parsePublicDmarcPolicy'

export function readPublicDmarcCandidate(
  records: string[][],
  source: string,
): PublicDmarcCandidate | null {
  const policies = records
    .map((parts) => parts.join(''))
    .filter((record) => /^v\s*=\s*DMARC1(?:\s*;|$)/.test(record.trim()))
  const record = policies[0] ?? ''
  return policies.length === 1 && parsePublicDmarcPolicy(record).valid
    ? { record, source }
    : null
}
