import dns from 'node:dns/promises'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'
import { withTimeout } from './withTimeout'

export async function resolveTxtSafe(hostname: string): Promise<string[][]> {
  try {
    return await withTimeout(dns.resolveTxt(hostname), DNS_TIMEOUT_MS)
  } catch {
    return []
  }
}
