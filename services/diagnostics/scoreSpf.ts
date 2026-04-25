import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreSpf(dns: DnsDiagnostics): number {
  if (dns.spf === null) {
    return 0
  }

  return dns.spfValid ? 20 : 10
}
