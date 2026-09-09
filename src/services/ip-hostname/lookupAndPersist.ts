import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { computeLookupSchedule } from './computeLookupSchedule'
import { executeDns } from './executeDns'
import type { HostnameLookupResult } from './HostnameLookupResult'
import { persistLookupOutcome } from './persistLookupOutcome'

/** Runs the reverse DNS and stores the outcome with its retry schedule. */
export async function lookupAndPersist(
  ip: string,
  now: Date,
  timeoutMs: number,
): Promise<HostnameLookupResult> {
  const lookup = await executeDns(ip, timeoutMs)
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
}
