import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreBimi(dns: DnsDiagnostics): number {
  return dns.bimi.valid ? 10 : 0
}
