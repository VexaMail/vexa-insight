import type { NormalizedEventPayload } from '@/types/dmarc'
import { lower } from './lower'
import { normalizeDkimResults } from './normalizeDkimResults'
import { normalizePolicyOverrides } from './normalizePolicyOverrides'
import { normalizeSpfAuthResult } from './normalizeSpfAuthResult'
import { num } from './num'
import { str } from './str'

export function recordToEvent(
  rec: Record<string, unknown>,
  reportBeginDate: number,
  reportEndDate: number,
): NormalizedEventPayload {
  const row = rec.row as Record<string, unknown> | undefined
  const sourceIp = str(row?.source_ip ?? '')
  const count = num(row?.count ?? 0)
  const policyEval = row?.policy_evaluated as
    Record<string, unknown> | undefined
  const disposition = lower(policyEval?.disposition ?? 'none')
  const dkimResult = lower(policyEval?.dkim ?? '')
  const spfResult = lower(policyEval?.spf ?? '')

  // Identifiers for alignment checks
  const identifiers = rec.identifiers as Record<string, unknown> | undefined
  const headerFrom = str(identifiers?.header_from ?? '')

  // Auth Results
  const authResults = rec.auth_results as Record<string, unknown> | undefined
  const rawSpfAuth = (authResults?.spf as Record<string, unknown> | undefined)
    ?.result
  const spfAuthResult = normalizeSpfAuthResult(rawSpfAuth)
  const dkimAuthResults = normalizeDkimResults(authResults?.dkim, headerFrom)

  // Policy Overrides
  const policyOverrides = normalizePolicyOverrides(policyEval?.reason)

  return {
    sourceIp,
    spfResult,
    dkimResult,
    spfAuthResult,
    dkimAuthResults,
    policyOverrides,
    spfAligned: spfResult === 'pass',
    dkimAligned: dkimResult === 'pass',
    disposition,
    count,
    reportBeginDate,
    reportEndDate,
  }
}
