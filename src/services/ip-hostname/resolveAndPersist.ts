import { getConfig } from '@/services/config'
import type { HostnameLookupResult } from './HostnameLookupResult'
import { inProgressLookups } from './inProgressLookups'
import { isPrivateIp } from './isPrivateIp'
import { lookupAndPersist } from './lookupAndPersist'
import { persistPrivateIpSkip } from './persistPrivateIpSkip'
import { privateIpSkippedError } from './privateIpSkippedError'

/**
 * Fully executes a reverse-DNS lookup and persists the resulting state.
 */
export async function resolveAndPersist(
  ip: string,
  _force = false,
  _triggeredBy?: string,
): Promise<HostnameLookupResult> {
  const config = getConfig()
  const now = new Date()

  if (inProgressLookups.has(ip)) {
    return {
      hostname: null,
      status: 'failed',
      error: 'Concurrency lock: Already resolving',
      resolvedAt: now,
    }
  }

  inProgressLookups.add(ip)

  try {
    if (!config.ipHostnameAllowPrivateIps && isPrivateIp(ip)) {
      await persistPrivateIpSkip(ip, now)

      return {
        hostname: null,
        status: 'not_found',
        error: privateIpSkippedError,
        resolvedAt: now,
      }
    }

    return await lookupAndPersist(ip, now, config.ipHostnameTimeoutMs)
  } finally {
    inProgressLookups.delete(ip)
  }
}
