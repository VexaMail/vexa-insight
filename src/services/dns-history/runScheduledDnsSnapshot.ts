import { domains, getDb } from '@/lib/db'
import { log } from '@/utils/log'
import { recordDnsSnapshot } from './recordDnsSnapshot'

/**
 * Cron entry point for the daily DNS snapshot of every monitored domain, one
 * domain at a time so a large install does not flood its resolver. A lookup
 * failure skips that domain; the function never throws.
 */
export async function runScheduledDnsSnapshot(): Promise<void> {
  try {
    const rows = await getDb().select({ name: domains.name }).from(domains)
    let changed = 0
    for (const row of rows) {
      try {
        changed += (await recordDnsSnapshot(row.name, 'scheduled')).length
      } catch (err) {
        log.warn('dns_history.snapshot_failed', {
          domain: row.name,
          err: err instanceof Error ? err.message : String(err),
        })
      }
    }
    log.info('dns_history.snapshot_done', { domains: rows.length, changed })
  } catch (err) {
    log.error('dns_history.run_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
