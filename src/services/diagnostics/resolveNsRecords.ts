import dns from 'node:dns/promises'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'
import { withDiagnosticsCache } from './withDiagnosticsCache'
import { withTimeout } from './withTimeout'

export async function resolveNsRecords(domain: string): Promise<string[]> {
  return withDiagnosticsCache(`ns:${domain}`, 5 * 60 * 1000, async () => {
    try {
      return await withTimeout(dns.resolveNs(domain), DNS_TIMEOUT_MS)
    } catch {
      return []
    }
  })
}
