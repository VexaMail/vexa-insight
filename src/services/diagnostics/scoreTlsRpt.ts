import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreTlsRpt(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'tlsRpt',
    label: 'TLS-RPT',
    max: domainScoreWeights.tlsRpt,
    weight: 'bonus',
  } as const

  if (!dns.tlsRpt.valid) {
    return {
      ...base,
      earned: 0,
      detail: 'Optional. Not published; reports TLS delivery failures.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.tlsRpt,
    detail: 'TLS reporting address published.',
  }
}
