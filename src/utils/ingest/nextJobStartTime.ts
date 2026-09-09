import type { IngestState } from '@/types/IngestState'

/**
 * Stamps the job start when a run begins from zero, clears it when the run
 * ends, and keeps it otherwise.
 */
export function nextJobStartTime(
  state: IngestState,
  running: boolean,
  incomingProcessed: number,
): number | null {
  if (running && incomingProcessed === 0 && !state.jobStartTime) {
    return Date.now()
  }
  if (!running) return null
  return state.jobStartTime
}
