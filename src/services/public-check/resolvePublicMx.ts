import type { Resolver } from 'node:dns/promises'
import { publicDnsFailure } from './publicDnsFailure'

export async function resolvePublicMx(
  resolver: Resolver,
  domain: string,
): Promise<string[] | null> {
  try {
    const records = await resolver.resolveMx(domain)
    return records
      .sort((a, b) => a.priority - b.priority)
      .map((record) => `${String(record.priority)} ${record.exchange || '.'}`)
  } catch (error) {
    return publicDnsFailure(error)
  }
}
