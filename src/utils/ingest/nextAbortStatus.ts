import type { IngestState } from '@/types/IngestState'

/**
 * Once the job stops, an abort that is not mid-request goes back to idle.
 */
export function nextAbortStatus(
  state: IngestState,
  running: boolean,
): IngestState['abortStatus'] {
  if (running) return state.abortStatus
  return state.abortStatus === 'loading' ? state.abortStatus : 'idle'
}
