import { setPollStatusInDb } from './setPollStatusInDb'

/** Clears the running state, whether the ingest succeeded or threw. */
export async function finishPollStatus(): Promise<void> {
  await setPollStatusInDb({
    isRunning: false,
    lastCheck: new Date(),
    abortRequested: false,
    processingEmails: 0,
    etaMs: 0,
    activeJobRunId: null,
    statusText: null,
  })
}
