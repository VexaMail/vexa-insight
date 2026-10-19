import { log } from '@/utils/log'
import { evaluateAlertRules } from './evaluateAlertRules'

/** Cron entry point for the daily alert-rule check; never throws. */
export async function runScheduledAlertEvaluation(): Promise<void> {
  try {
    const fired = await evaluateAlertRules()
    if (fired.length > 0) log.info('alerts.rules_fired', { fired })
  } catch (err) {
    log.error('alerts.evaluation_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
