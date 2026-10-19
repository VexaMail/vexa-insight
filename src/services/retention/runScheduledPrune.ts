import { log } from '@/utils/log'
import { pruneTables } from './pruneTables'

/** Cron entry point for the daily retention prune; never throws. */
export function runScheduledPrune(): void {
  try {
    const removed = pruneTables()
    if (removed.sessions > 0 || removed.pollEvents > 0) {
      log.info('retention.pruned', removed)
    }
  } catch (err) {
    log.error('retention.prune_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
