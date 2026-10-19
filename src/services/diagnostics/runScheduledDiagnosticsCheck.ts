import { log } from '@/utils/log'
import { listDiagnosticsOverviewRows } from './listDiagnosticsOverviewRows'
import { runDiagnosticsOverviewCheck } from './runDiagnosticsOverviewCheck'

/**
 * Cron entry point that refreshes every domain's stored DNS run, one domain at
 * a time so a large install does not flood its resolver, and so the index has
 * nothing to look up on an ordinary visit. Never throws.
 */
export async function runScheduledDiagnosticsCheck(): Promise<void> {
  try {
    const rows = await listDiagnosticsOverviewRows(null)
    let failed = 0
    for (const row of rows) {
      try {
        await runDiagnosticsOverviewCheck(row.domainId, row.domainName)
      } catch (err) {
        failed += 1
        log.warn('diagnostics.check_failed', {
          domain: row.domainName,
          err: err instanceof Error ? err.message : String(err),
        })
      }
    }
    log.info('diagnostics.check_done', { domains: rows.length, failed })
  } catch (err) {
    log.error('diagnostics.check_run_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
