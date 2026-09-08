import type { BatchProgressInput } from '@/types/imap'

/** Report chunk counters with an ETA extrapolated from the average so far. */
export async function reportBatchProgress({
  options,
  folderProcessedCount,
  processingCount,
  folderTotalEmails,
  startTime,
}: BatchProgressInput): Promise<void> {
  if (!options.onBatchProgress) return

  const avgTimeMs =
    folderProcessedCount > 0
      ? (Date.now() - startTime) / folderProcessedCount
      : 0
  const remaining = folderTotalEmails - folderProcessedCount

  await options.onBatchProgress(
    folderProcessedCount,
    processingCount,
    folderTotalEmails,
    Math.max(0, remaining * avgTimeMs),
  )
}
