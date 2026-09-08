import { getProcessedMessageIdsByMessageIds } from '@/services/processed-messages'
import type { AttachmentResult, ProcessChunkInput } from '@/types/imap'
import { chunkScanMessage } from '@/utils/imap'
import type { FetchMessageObject } from 'imapflow'
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
  input: ProcessChunkInput,
): AsyncGenerator<AttachmentResult, number> {
  const { client, account, folder, chunk, chunkIndex, options } = input
  const done = input.folderProcessedCount + chunk.length

  await emitStatus(options, chunkScanMessage(input))
  await reportBatchProgress(
    options,
    input.folderProcessedCount,
    chunk.length,
    input.folderTotalEmails,
    input.startTime,
  )

  let envMessages: FetchMessageObject[]
  try {
    envMessages = await fetchEnvelopesForChunk(client, chunk)
  } catch (err) {
    console.error('[ingest] bulk fetch envelopes failed:', err)
    return done
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
      `Processing ${String(uidsToProcessFull.length)} DMARC email${uidsToProcessFull.length === 1 ? '' : 's'} (batch ${String(chunkIndex + 1)})…`,
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

  return done
}
