import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { getConfig } from '@/services/config'
import { eq } from 'drizzle-orm'
import { computeLookupSchedule } from './computeLookupSchedule'
import { executeDns } from './executeDns'
import type { HostnameLookupResult } from './HostnameLookupResult'
import { inProgressLookups } from './inProgressLookups'
import { isPrivateIp } from './isPrivateIp'
import { persistLookupOutcome } from './persistLookupOutcome'
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

    const lookup = await executeDns(ip, config.ipHostnameTimeoutMs)
    const [existing] = await getDb()
      .select()
      .from(ipHostnameEnrichments)
      .where(eq(ipHostnameEnrichments.ip, ip))
      .limit(1)

    await persistLookupOutcome({
      ip,
      now,
      lookup,
      schedule: computeLookupSchedule({
        status: lookup.status,
        now,
        previousRetryCount: existing ? existing.retryCount : 0,
        previousSuccessAt: existing?.lastSuccessAt ?? null,
      }),
    })

    return {
      hostname: lookup.hostname,
      status: lookup.status,
      error: lookup.error,
      resolvedAt: now,
    }
  } finally {
    inProgressLookups.delete(ip)
  }
}
