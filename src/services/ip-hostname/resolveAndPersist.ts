import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { getConfig } from '@/services/config'
import { eq } from 'drizzle-orm'
import { executeDns } from './executeDns'
import type { HostnameLookupResult } from './HostnameLookupResult'
import { inProgressLookups } from './inProgressLookups'
import { isPrivateIp } from './isPrivateIp'

/**
 * Fully executes a reverse-DNS lookup and persists the resulting state.
 */
export async function resolveAndPersist(
  ip: string,
  _force = false,
  _triggeredBy?: string,
): Promise<HostnameLookupResult> {
  const config = getConfig()
  const db = getDb()
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
      const nextLookupAt = new Date(
        now.getTime() + config.ipHostnameNegativeCacheHours * 60 * 60 * 1000,
      )
      await db
        .insert(ipHostnameEnrichments)
        .values({
          ip,
          lookupStatus: 'not_found',
          lookupError: 'Private IP skipped',
          nextLookupAt,
        })
        .onConflictDoUpdate({
          target: ipHostnameEnrichments.ip,
          set: {
            lookupStatus: 'not_found',
            lookupError: 'Private IP skipped',
            nextLookupAt,
            updatedAt: now,
          },
        })

      return {
        hostname: null,
        status: 'not_found',
        error: 'Private IP skipped',
        resolvedAt: now,
      }
    }

    const lookupResult = await executeDns(ip, config.ipHostnameTimeoutMs)
    const hostname = lookupResult.hostname
    const status = lookupResult.status
    const error = lookupResult.error

    const [existing] = await db
      .select()
      .from(ipHostnameEnrichments)
      .where(eq(ipHostnameEnrichments.ip, ip))
      .limit(1)

    let retryCount = existing ? existing.retryCount : 0
    let nextLookupAt: Date
    let lastSuccessAt = existing?.lastSuccessAt ?? null

    if (status === 'success') {
      retryCount = 0
      lastSuccessAt = now
      nextLookupAt = new Date(
        now.getTime() + config.ipHostnameRefreshIntervalHours * 60 * 60 * 1000,
      )
    } else if (status === 'not_found') {
      retryCount = 0
      nextLookupAt = new Date(
        now.getTime() + config.ipHostnameNegativeCacheHours * 60 * 60 * 1000,
      )
    } else {
      retryCount += 1
      if (retryCount > config.ipHostnameMaxRetries) {
        retryCount = 0
        nextLookupAt = new Date(
          now.getTime() + config.ipHostnameNegativeCacheHours * 60 * 60 * 1000,
        )
      } else {
        const backoffMs =
          config.ipHostnameRetryBackoffMinutes * 60 * 1000 * retryCount
        nextLookupAt = new Date(now.getTime() + backoffMs)
      }
    }

    await db
      .insert(ipHostnameEnrichments)
      .values({
        ip,
        hostname,
        lookupStatus: status,
        lastLookupAt: now,
        nextLookupAt,
        lastSuccessAt,
        lookupError: error,
        retryCount,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: ipHostnameEnrichments.ip,
        set: {
          hostname,
          lookupStatus: status,
          lastLookupAt: now,
          nextLookupAt,
          lastSuccessAt,
          lookupError: error,
          retryCount,
          updatedAt: now,
        },
      })

    return {
      hostname,
      status,
      error,
      resolvedAt: now,
    }
  } finally {
    inProgressLookups.delete(ip)
  }
}
