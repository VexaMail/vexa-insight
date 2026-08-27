import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { getConfig } from '@/services/config'
import { eq } from 'drizzle-orm'
import dns from 'node:dns'
import type { HostnameLookupResult } from './HostnameLookupResult'
import { inProgressLookups } from './inProgressLookups'

export class IpHostnameEnrichmentService {
  /**
   * Schedules a background lookup by inserting a pending row, if it doesn't already exist.
   */
  static async scheduleLookup(ip: string): Promise<void> {
    const db = getDb()
    try {
      await db
        .insert(ipHostnameEnrichments)
        .values({
          ip,
          lookupStatus: 'pending',
        })
        .onConflictDoNothing({ target: ipHostnameEnrichments.ip })
    } catch (error) {
      console.error(
        `[IpHostnameEnrichmentService] Error scheduling lookup for ${ip}:`,
        error,
      )
    }
  }

  /**
   * Evaluates if a record needs refreshing based on nextLookupAt and forced flags.
   */
  static shouldRefresh(
    record: typeof ipHostnameEnrichments.$inferSelect,
    force = false,
  ): boolean {
    if (force) return true
    if (record.lookupStatus === 'pending') return true
    if (!record.nextLookupAt) return true
    return record.nextLookupAt <= new Date()
  }

  /**
   * Helper to determine if an IP is private/local.
   */
  private static isPrivateIp(ip: string): boolean {
    const parts = ip.split('.')
    if (parts.length !== 4) return false

    const [p1, p2] = parts.map(Number)

    return (
      p1 === 10 || // 10.0.0.0/8
      (p1 === 172 && p2 !== undefined && p2 >= 16 && p2 <= 31) || // 172.16.0.0/12
      (p1 === 192 && p2 === 168) || // 192.168.0.0/16
      p1 === 127 || // 127.0.0.0/8 (loopback)
      (p1 === 169 && p2 === 254) // Link-local
    )
  }

  /**
   * Wraps the native DNS lookup with a Promise.race timeout.
   */
  private static async performDnsLookup(
    ip: string,
    timeoutMs: number,
  ): Promise<string[]> {
    let timer: NodeJS.Timeout | undefined
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)
    })
    try {
      return await Promise.race([dns.promises.reverse(ip), timeoutPromise])
    } finally {
      clearTimeout(timer)
    }
  }

  /**
   * Executes DNS and normalizes the error responses to status states.
   */
  private static async executeDns(
    ip: string,
    timeoutMs: number,
  ): Promise<{
    hostname: string | null
    status: 'success' | 'failed' | 'not_found'
    error: string | null
  }> {
    try {
      const hostnames = await this.performDnsLookup(ip, timeoutMs)
      if (hostnames && hostnames.length > 0) {
        return {
          hostname: hostnames[0] ?? null,
          status: 'success',
          error: null,
        }
      }
      return { hostname: null, status: 'not_found', error: 'No PTR record' }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      const errorCode = (err as { code?: string })?.code

      if (errorCode === 'ENOTFOUND') {
        return { hostname: null, status: 'not_found', error: 'ENOTFOUND' }
      } else if (errorMsg === 'TIMEOUT') {
        return {
          hostname: null,
          status: 'failed',
          error: 'Timeout resolving DNS',
        }
      }
      return {
        hostname: null,
        status: 'failed',
        error: errorMsg || 'Unknown DNS Error',
      }
    }
  }

  /**
   * Fully executes the lookup and persists the state change to DB.
   */
  static async resolveAndPersist(
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
      // 1. Validate IP / Private
      if (!config.ipHostnameAllowPrivateIps && this.isPrivateIp(ip)) {
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

      // 2. Execute Lookup
      const lookupResult = await this.executeDns(ip, config.ipHostnameTimeoutMs)
      const hostname = lookupResult.hostname
      const status = lookupResult.status
      const error = lookupResult.error

      // 3. Fetch existing to properly apply retries/backoffs
      const [existing] = await db
        .select()
        .from(ipHostnameEnrichments)
        .where(eq(ipHostnameEnrichments.ip, ip))
        .limit(1)

      let retryCount = existing ? existing.retryCount : 0
      let nextLookupAtStr: Date
      let lastSuccessAt = existing?.lastSuccessAt ?? null

      if (status === 'success') {
        retryCount = 0
        lastSuccessAt = now
        nextLookupAtStr = new Date(
          now.getTime() +
            config.ipHostnameRefreshIntervalHours * 60 * 60 * 1000,
        )
      } else if (status === 'not_found') {
        // Not found, treat it like a long interval cache (negative caching)
        retryCount = 0
        nextLookupAtStr = new Date(
          now.getTime() + config.ipHostnameNegativeCacheHours * 60 * 60 * 1000,
        )
      } else {
        // Failed
        retryCount += 1
        if (retryCount > config.ipHostnameMaxRetries) {
          // Max retries reached, fallback to negative cache timing
          retryCount = 0
          nextLookupAtStr = new Date(
            now.getTime() +
              config.ipHostnameNegativeCacheHours * 60 * 60 * 1000,
          )
        } else {
          // Backoff
          const backoffMs =
            config.ipHostnameRetryBackoffMinutes * 60 * 1000 * retryCount
          nextLookupAtStr = new Date(now.getTime() + backoffMs)
        }
      }

      // 4. Persist
      await db
        .insert(ipHostnameEnrichments)
        .values({
          ip,
          hostname,
          lookupStatus: status,
          lastLookupAt: now,
          nextLookupAt: nextLookupAtStr,
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
            nextLookupAt: nextLookupAtStr,
            lastSuccessAt,
            lookupError: error,
            retryCount,
            updatedAt: now,
          },
        })

      return {
        hostname,
        status: status as 'success' | 'failed' | 'not_found',
        error,
        resolvedAt: now,
      }
    } finally {
      inProgressLookups.delete(ip)
    }
  }
}
