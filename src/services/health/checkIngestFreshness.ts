import { getDb, jobRuns } from '@/lib/db'
import { getConfig } from '@/services/config'
import type { IngestFreshness } from '@/types/health'
import { computeIngestStaleAfterMs } from '@/utils/health'
import { hasConfiguredImapAccount } from '@/utils/imap'
import { desc } from 'drizzle-orm'

/**
 * Whether scheduled ingestion is still running. A process whose scheduler
 * died keeps serving pages and passing a database ping, which is how a
 * five-hour gap once went unnoticed; the age of the newest job run is what
 * gives it away.
 */
export async function checkIngestFreshness(
  now: Date = new Date(),
): Promise<IngestFreshness> {
  let intervalMinutes: number
  try {
    const config = getConfig()
    if (!hasConfiguredImapAccount(config)) return 'idle'
    intervalMinutes = config.ingestionIntervalMinutes
  } catch {
    return 'idle'
  }

  const staleAfterMs = computeIngestStaleAfterMs(intervalMinutes)
  const [latest] = await getDb()
    .select({ runAt: jobRuns.runAt })
    .from(jobRuns)
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
  // A fresh process has not reached its first tick yet.
  const since =
    latest?.runAt.getTime() ?? now.getTime() - process.uptime() * 1000
  return now.getTime() - since > staleAfterMs ? 'stale' : 'ok'
}
