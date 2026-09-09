import type { PollStatusResponseData } from '@/types/ingest'
import type { IngestState } from '@/types/IngestState'
import { mergeProgressFields } from './mergeProgressFields'
import { nextAbortStatus } from './nextAbortStatus'
import { nextJobStartTime } from './nextJobStartTime'

export function computeNextStoreState(
  state: IngestState,
  data: PollStatusResponseData,
): Partial<IngestState> {
  const running = data.isRunning ?? false
  const incomingProcessed = data.currentProcessed ?? state.currentProcessed

  return {
    ...mergeProgressFields(state, data),
    jobStartTime: nextJobStartTime(state, running, incomingProcessed),
    isRunning: running,
    runRequested: running ? false : state.runRequested,
    abortStatus: nextAbortStatus(state, running),
    currentProcessed: incomingProcessed,
    totalEmails: data.totalEmails ?? state.totalEmails,
    processingEmails: data.processingEmails ?? state.processingEmails,
    etaMs: data.etaMs ?? state.etaMs,
  }
}
