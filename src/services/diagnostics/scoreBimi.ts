import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreBimi(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'bimi',
    label: 'BIMI',
    max: domainScoreWeights.bimi,
    weight: 'bonus',
  } as const

  if (!dns.bimi.valid) {
    return {
      ...base,
      earned: 0,
      detail: 'Optional. Not published; shows your logo in supporting clients.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.bimi,
    detail: 'BIMI record published.',
  }
}
