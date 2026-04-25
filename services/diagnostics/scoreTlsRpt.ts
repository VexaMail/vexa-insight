import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreTlsRpt(dns: DnsDiagnostics): number {
  return dns.tlsRpt.valid ? 10 : 0
}
