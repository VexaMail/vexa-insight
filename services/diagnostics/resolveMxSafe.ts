import dns from 'node:dns/promises'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'
import { withTimeout } from './withTimeout'

export async function resolveMxSafe(
  hostname: string,
): Promise<{ priority: number; exchange: string }[]> {
  try {
    return await withTimeout(dns.resolveMx(hostname), DNS_TIMEOUT_MS)
  } catch {
    return []
  }
}
