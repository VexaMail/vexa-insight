import { domainScoreWeights } from '@/constants/diagnostics'
import type { DnsDiagnostics, DomainScoreCheck } from '@/types/diagnostics'

export function scoreDkim(dns: DnsDiagnostics): DomainScoreCheck {
  const base = {
    id: 'dkim',
    label: 'DKIM',
    max: domainScoreWeights.dkim,
    weight: 'core',
  } as const
  const valid = dns.dkimParsedRecords.filter((record) => record.valid)

  if (valid.length === 0) {
    return {
      ...base,
      earned: 0,
      detail:
        'No usable key found among the checked selectors. Confirm the selector used by your sender; DNS probes cannot enumerate every selector or verify message signing.',
    }
  }

  return {
    ...base,
    earned: domainScoreWeights.dkim,
    detail: `Valid DKIM key on ${valid.map((record) => record.selector).join(', ')}.`,
  }
}
