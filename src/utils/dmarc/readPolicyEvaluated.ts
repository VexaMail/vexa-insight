import type { DmarcPolicyEvaluated } from '@/types/dmarc'

import { lower } from './lower'

export function readPolicyEvaluated(
  rec: Record<string, unknown>,
): DmarcPolicyEvaluated {
  const row = rec['row'] as Record<string, unknown> | undefined
  const policyEval = row?.['policy_evaluated'] as
    Record<string, unknown> | undefined
  return {
    disposition: lower(policyEval?.['disposition'] ?? 'none'),
    dkimResult: lower(policyEval?.['dkim'] ?? ''),
    spfResult: lower(policyEval?.['spf'] ?? ''),
    reason: policyEval?.['reason'],
  }
}
