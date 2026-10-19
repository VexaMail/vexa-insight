import type { IngestionHealth, IngestionHealthInput } from '@/types/dashboard'
import { ingestionState } from './ingestionState'
import { lastRunFacts } from './lastRunFacts'
import { nextScheduledRunMs } from './nextScheduledRunMs'

/** Folds scheduler config, poll status and the latest job run into one view. */
export function buildIngestionHealth(
  input: IngestionHealthInput,
): IngestionHealth {
  const scheduled = input.hasImapAccount && input.intervalMinutes >= 1
  return {
    ...lastRunFacts(input.latestRun),
    state: ingestionState(input),
    intervalMinutes: scheduled ? input.intervalMinutes : null,
    lastSuccessAtMs: input.lastSuccessAtMs,
    nextRunAtMs: scheduled
      ? nextScheduledRunMs(input.nowMs, input.intervalMinutes)
      : null,
    newestReportDay: input.newestReportDay,
  }
}
