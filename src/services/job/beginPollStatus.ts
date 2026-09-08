import { setPollStatusInDb } from './setPollStatusInDb'

/** Marks the ingest as running so the dashboard can show progress and abort. */
export async function beginPollStatus(
  jobRunId: number | undefined,
  fullRescan: boolean,
): Promise<void> {
  await setPollStatusInDb({
    isRunning: true,
    lastCheck: new Date(),
    currentProcessed: 0,
    totalEmails: 0,
    abortRequested: false,
    activeJobRunId: jobRunId ?? null,
    statusText: fullRescan
      ? 'Connecting to mail servers (full rescan)...'
      : 'Connecting to mail servers...',
  })
}
