import { dmarcPolicyPoints } from '@/constants/diagnostics'
import { hasDmarcRua } from './hasDmarcRua'
import { parseDmarcPct } from './parseDmarcPct'

/**
 * Points of a valid DMARC record: the policy sets the base, a partial pct and a
 * missing rua address take some of it back.
 */
export function scoreDmarcPolicy(dmarcRecord: string, policy: string): number {
  const base =
    policy === 'reject' || policy === 'quarantine'
      ? dmarcPolicyPoints[policy]
      : dmarcPolicyPoints.none

  const pctPenalty =
    policy !== 'none' && parseDmarcPct(dmarcRecord) < 100 ? 10 : 0
  const ruaPenalty = hasDmarcRua(dmarcRecord) ? 0 : 5

  return Math.max(base - pctPenalty - ruaPenalty, 0)
}
