import type { PollStatusResponseData } from '@/types/ingest'
import type { IngestState } from '@/types/IngestState'

/**
 * Progress fields of the poll response, each falling back to the stored value
 * when the response omits it.
 */
export function mergeProgressFields(
  state: IngestState,
  data: PollStatusResponseData,
): Partial<IngestState> {
  return {
    lastCheck: data.lastCheck ?? state.lastCheck,
    progressItems: data.progressItems?.items ?? state.progressItems,
    progressTotal: data.progressItems?.total ?? state.progressTotal,
    activeJobRunId: data.activeJobRunId ?? state.activeJobRunId,
    statusText:
      data.statusText !== undefined
        ? (data.statusText ?? null)
        : state.statusText,
  }
}
