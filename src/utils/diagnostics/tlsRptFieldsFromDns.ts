import type { DnsDiagnostics, TlsRptGeneratorFields } from '@/types/diagnostics'
import { stripMailto } from './stripMailto'

/** The TLS-RPT form filled from the published report addresses. */
export function tlsRptFieldsFromDns(
  dns: DnsDiagnostics,
): TlsRptGeneratorFields {
  return {
    destinations: dns.tlsRpt.ruaAddresses.map(stripMailto).join(', '),
  }
}
