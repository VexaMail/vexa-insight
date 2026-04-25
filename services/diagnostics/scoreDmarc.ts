import type { DnsDiagnostics } from '@/types/diagnostics'

export function scoreDmarc(dns: DnsDiagnostics): number {
  if (dns.dmarc === null) {
    return 0
  }

  if (!dns.dmarcValid) {
    return 5
  }

  if (dns.dmarcPolicy === 'reject') {
    return 30
  }

  if (dns.dmarcPolicy === 'quarantine') {
    return 25
  }

  return 15
}
