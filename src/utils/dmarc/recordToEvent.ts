import type { NormalizedEventPayload } from '@/types/dmarc'
import { normalizePolicyOverrides } from './normalizePolicyOverrides'
import { num } from './num'
import { readAuthResults } from './readAuthResults'
import { readPolicyEvaluated } from './readPolicyEvaluated'
import { str } from './str'

export function recordToEvent(
  rec: Record<string, unknown>,
  reportBeginDate: number,
  reportEndDate: number,
): NormalizedEventPayload {
  const row = rec['row'] as Record<string, unknown> | undefined
  const sourceIp = str(row?.['source_ip'] ?? '')
  const count = num(row?.['count'] ?? 0)
  const { disposition, dkimResult, spfResult, reason } =
    readPolicyEvaluated(rec)

  // Identifiers for alignment checks
  const identifiers = rec['identifiers'] as Record<string, unknown> | undefined
  const headerFrom = str(identifiers?.['header_from'] ?? '')

  const { spfAuthResult, dkimAuthResults } = readAuthResults(rec, headerFrom)
  const policyOverrides = normalizePolicyOverrides(reason)

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
