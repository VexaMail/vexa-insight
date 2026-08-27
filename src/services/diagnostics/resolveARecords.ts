import dns from 'node:dns/promises'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'
import { withDiagnosticsCache } from './withDiagnosticsCache'
import { withTimeout } from './withTimeout'

export async function resolveARecords(domain: string): Promise<string[]> {
  return withDiagnosticsCache(`a:${domain}`, 5 * 60 * 1000, async () => {
    try {
      return await withTimeout(dns.resolve4(domain), DNS_TIMEOUT_MS)
    } catch {
      return []
    }
  })
}
