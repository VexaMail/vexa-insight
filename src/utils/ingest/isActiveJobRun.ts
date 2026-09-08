/**
 * True when a history row is the run currently in flight: the explicitly
 * active run when the poller reported one, the newest row otherwise.
 */
export function isActiveJobRun(
  jobId: number,
  isGlobalRunning: boolean,
  activeJobRunId: number | null | undefined,
  runs: { id: number }[],
): boolean {
  if (!isGlobalRunning) return false
  return activeJobRunId ? activeJobRunId === jobId : jobId === runs[0]?.id
}
