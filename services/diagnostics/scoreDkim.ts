import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreDkim(dns: DnsDiagnostics): number {
  return dns.dkim.some((record) => record.valid) ? 20 : 0
}
