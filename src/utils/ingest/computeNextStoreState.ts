import type { PollStatusResponseData } from '@/types/ingest/PollStatusResponseData'
import type { IngestState } from '@/types/IngestState'

export function computeNextStoreState(
  state: IngestState,
  data: PollStatusResponseData,
): Partial<IngestState> {
  const running = data.isRunning ?? false
  const incomingProcessed = data.currentProcessed ?? state.currentProcessed

  let newJobStartTime = state.jobStartTime
  if (running && incomingProcessed === 0 && !state.jobStartTime) {
    newJobStartTime = Date.now()
  } else if (!running) {
    newJobStartTime = null
  }

  let newAbortStatus = state.abortStatus
  if (!running) {
    newAbortStatus =
      state.abortStatus === 'loading' ? state.abortStatus : 'idle'
  }

  return {
    jobStartTime: newJobStartTime,
    isRunning: running,
    runRequested: running ? false : state.runRequested,
    abortStatus: newAbortStatus,
    lastCheck: data.lastCheck ?? state.lastCheck,
    currentProcessed: incomingProcessed,
    totalEmails: data.totalEmails ?? state.totalEmails,
    processingEmails: data.processingEmails ?? state.processingEmails,
    etaMs: data.etaMs ?? state.etaMs,
    progressItems: data.progressItems?.items ?? state.progressItems,
    progressTotal: data.progressItems?.total ?? state.progressTotal,
    activeJobRunId: data.activeJobRunId ?? state.activeJobRunId,
    statusText:
      data.statusText !== undefined
        ? (data.statusText ?? null)
        : state.statusText,
  }
}
