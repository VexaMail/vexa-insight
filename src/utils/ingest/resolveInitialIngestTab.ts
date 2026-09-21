import type { IngestTab } from '@/types/IngestTab'

/**
 * Which tab the ingest page opens on. Poll results are only worth showing when
 * there is live progress; otherwise the run history is the useful landing view.
 */
export function resolveInitialIngestTab(
  isRunning: boolean,
  progressItemCount: number,
): IngestTab {
  return isRunning || progressItemCount > 0 ? 'pollResults' : 'jobRuns'
}
