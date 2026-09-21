import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreDkim(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'dkim',
    label: 'DKIM',
    max: domainScoreWeights.dkim,
    weight: 'core',
  } as const
  const valid = dns.dkim.filter((record) => record.valid)

  if (valid.length === 0) {
    return {
      ...base,
      earned: 0,
      detail:
        'No valid DKIM key found on the scanned selectors. Publish a key and sign outgoing mail.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.dkim,
    detail: `Valid DKIM key on ${valid.map((record) => record.selector).join(', ')}.`,
  }
}
