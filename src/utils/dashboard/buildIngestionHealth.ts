import type { IngestionHealth, IngestionHealthInput } from '@/types/dashboard'
import { ingestionState } from './ingestionState'
import { lastRunFacts } from './lastRunFacts'
import { latestMs } from './latestMs'
import { nextScheduledRunMs } from './nextScheduledRunMs'
import { recentRunErrors } from './recentRunErrors'
import { runDurationMs } from './runDurationMs'

/** Folds scheduler config, poll status and the latest job runs into one view. */
export function buildIngestionHealth(
  input: IngestionHealthInput,
): IngestionHealth {
  const scheduled = input.hasImapAccount && input.intervalMinutes >= 1
  return {
    ...lastRunFacts(input.latestRun),
    state: ingestionState(input),
    intervalMinutes: scheduled ? input.intervalMinutes : null,
    previousRunProcessed: input.previousRun?.processed ?? null,
    lastSuccessAtMs: input.lastSuccessAtMs,
    nextRunAtMs: scheduled
      ? nextScheduledRunMs(input.nowMs, input.intervalMinutes)
      : null,
    mailboxFreshAtMs: latestMs(input.lastSuccessAtMs, input.newestIngestedAtMs),
    lastRunDurationMs: runDurationMs(
      input.latestRun,
      input.lastRunCompletedAtMs,
    ),
    mailboxCount: input.mailboxCount,
    recentErrorCount: recentRunErrors(input.recentRuns, input.nowMs),
    newestReportDay: input.newestReportDay,
  }
}
