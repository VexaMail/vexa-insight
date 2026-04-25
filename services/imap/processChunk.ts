import { getProcessedMessageIdsByMessageIds } from '@/services/processed-messages'
import type { ImapAccountConfig } from '@/types/config'
import type { AttachmentResult, FetchAttachmentsOptions } from '@/types/imap'
import type { FetchMessageObject, ImapFlow } from 'imapflow'
import { buildUidToMidMap } from './buildUidToMidMap'
import { emitStatus } from './emitStatus'
import { fetchEnvelopesForChunk } from './fetchEnvelopesForChunk'
import { filterChunkUids } from './filterChunkUids'
import { processUnprocessedUids } from './processUnprocessedUids'
import { reportBatchProgress } from './reportBatchProgress'

/**
 * Process a single chunk of UIDs within a folder scan.
 * Returns the updated folderProcessedCount.
 */
export async function* processChunk(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
  chunk: number[],
  chunkIndex: number,
  chunkSize: number,
  folderTotalEmails: number,
  folderProcessedCount: number,
  startTime: number,
  options: FetchAttachmentsOptions,
): AsyncGenerator<AttachmentResult, number> {
  const chunkStart = chunkIndex * chunkSize
  const chunkEnd = Math.min(chunkStart + chunkSize, folderTotalEmails)

  await emitStatus(
    options,
    `Scanning emails ${(chunkStart + 1).toLocaleString()}\u2013${chunkEnd.toLocaleString()} of ${folderTotalEmails.toLocaleString()} in ${folder}\u2026`,
  )

  await reportBatchProgress(
    options,
    folderProcessedCount,
    chunk.length,
    folderTotalEmails,
    startTime,
  )

  let envMessages: FetchMessageObject[]
  try {
    envMessages = await fetchEnvelopesForChunk(client, chunk)
  } catch (err) {
    console.error('[ingest] bulk fetch envelopes failed:', err)
    return folderProcessedCount + chunk.length
  }

  const { uidToMidMap, messageIdsToLookup } = buildUidToMidMap(envMessages)

  const processedIdsSet = await getProcessedMessageIdsByMessageIds(
    account.id,
    messageIdsToLookup,
  )

  const uidsToProcessFull = await filterChunkUids(
    client,
    account,
    folder,
    chunk,
    uidToMidMap,
    processedIdsSet,
    options,
  )

  if (uidsToProcessFull.length > 0) {
    await emitStatus(
      options,
      `Processing ${uidsToProcessFull.length} DMARC email${uidsToProcessFull.length === 1 ? '' : 's'} (batch ${chunkIndex + 1})\u2026`,
    )
    yield* processUnprocessedUids(
      client,
      account,
      folder,
      uidsToProcessFull,
      uidToMidMap,
      options,
    )
  }

  return folderProcessedCount + chunk.length
}
