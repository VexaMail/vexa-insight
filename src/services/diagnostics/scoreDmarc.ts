import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'
import { describeDmarcDeductions } from './describeDmarcDeductions'
import { scoreDmarcPolicy } from './scoreDmarcPolicy'

export function scoreDmarc(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'dmarc',
    label: 'DMARC',
    max: domainScoreWeights.dmarc,
    weight: 'core',
  } as const

  if (dns.dmarc === null) {
    return {
      ...base,
      earned: 0,
      detail: 'No DMARC record. Start with p=none and a rua address.',
    }
  }

  if (!dns.dmarcValid) {
    return {
      ...base,
      earned: 5,
      detail:
        'DMARC record found but invalid. Fix the syntax before tightening the policy.',
    }
  }

  const policy = dns.dmarcPolicy ?? 'none'
  const notes = describeDmarcDeductions(dns.dmarc, policy)

  return {
    ...base,
    earned: scoreDmarcPolicy(dns.dmarc, policy),
    detail:
      notes.length > 0
        ? `Policy p=${policy}: ${notes.join('; ')}.`
        : `Policy p=${policy} with aggregate reporting enabled.`,
  }
}
