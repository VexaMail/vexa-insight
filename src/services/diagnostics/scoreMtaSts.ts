import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreMtaSts(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'mtaSts',
    label: 'MTA-STS',
    max: domainScoreWeights.mtaSts,
    weight: 'bonus',
  } as const

  if (!dns.mtaSts.valid) {
    return {
      ...base,
      earned: 0,
      detail: 'Optional. Not published; adds TLS enforcement for inbound mail.',
    }
  }

  if (!dns.mtaSts.policyFileAccessible) {
    return {
      ...base,
      earned: 3,
      detail: 'Record published but the policy file is unreachable.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.mtaSts,
    detail: 'Record and policy file both served.',
  }
}
