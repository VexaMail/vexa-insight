import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreMtaSts(dns: DnsDiagnostics): number {
  if (!dns.mtaSts.valid) {
    return 0
  }

  return dns.mtaSts.policyFileAccessible ? 10 : 5
}
