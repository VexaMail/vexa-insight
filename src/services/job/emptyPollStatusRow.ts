import type { PollStatusRow } from './PollStatusRow'

/** The idle status a fresh install starts from. */
export const EMPTY_POLL_STATUS_ROW: PollStatusRow = {
  isRunning: false,
  lastCheck: null,
  currentProcessed: 0,
  totalEmails: 0,
  processingEmails: 0,
  etaMs: 0,
  abortRequested: false,
  activeJobRunId: null,
  statusText: null,
}
