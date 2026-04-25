import type { FetchAttachmentsOptions } from '@/types/imap'

export async function reportBatchProgress(
  options: FetchAttachmentsOptions,
  folderProcessedCount: number,
  processingCount: number,
  folderTotalEmails: number,
  startTime: number,
) {
  if (options.onBatchProgress) {
    const avgTimeMs =
      folderProcessedCount > 0
        ? (Date.now() - startTime) / folderProcessedCount
        : 0
    const remaining = folderTotalEmails - folderProcessedCount
    const etaMs = Math.max(0, remaining * avgTimeMs)
    await options.onBatchProgress(
      folderProcessedCount,
      processingCount,
      folderTotalEmails,
      etaMs,
    )
  }
}
