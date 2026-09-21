import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreSpf(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'spf',
    label: 'SPF',
    max: domainScoreWeights.spf,
    weight: 'core',
  } as const

  if (dns.spf === null) {
    return {
      ...base,
      earned: 0,
      detail: 'No SPF record. Publish one listing every sender you use.',
    }
  }

  if (!dns.spfValid) {
    return {
      ...base,
      earned: 10,
      detail:
        'SPF record found but invalid. Fix the syntax to earn full credit.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.spf,
    detail: 'Valid SPF record published.',
  }
}
