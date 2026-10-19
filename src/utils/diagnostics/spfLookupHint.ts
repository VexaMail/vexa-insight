import type { DnsDiagnostics } from '@/types/diagnostics'

/** "4/10 DNS lookups" when the lookup tree resolved, otherwise a plain fact. */
export function spfLookupHint(dns: DnsDiagnostics): string {
  if (dns.spfTree === null) return 'Record found'
  return `${String(dns.spfTree.lookupCount)}/10 DNS lookups`
}
