import { CHUNK_UID_COUNT } from '@/constants/ingest'
import type { AttachmentResult, ProcessFolderInput } from '@/types/imap'
import { buildDmarcSearchQuery } from '@/utils/imap'
import { emitStatus } from './emitStatus'
import { processChunk } from './processChunk'

/** Scan one mailbox folder, yielding every DMARC attachment it holds. */
export async function* processFolder(
  input: ProcessFolderInput,
): AsyncGenerator<AttachmentResult> {
  const { client, account, folder, since, options } = input

  await emitStatus(
    options,
    `Searching for DMARC emails in ${folder} on ${account.server}…`,
  )

  const uids = await client.search(buildDmarcSearchQuery(since), { uid: true })
  const uidList = Array.isArray(uids) ? uids : []
  const folderTotalEmails = uidList.length
  if (folderTotalEmails === 0) {
    await emitStatus(
      options,
      `No emails found in ${folder} on ${account.server}`,
    )
    return
  }

  await emitStatus(
    options,
    `Found ${folderTotalEmails.toLocaleString()} emails in ${folder} on ${account.server}`,
  )

  const startTime = Date.now()
  let folderProcessedCount = 0
  for (let i = 0; i < uidList.length; i += CHUNK_UID_COUNT) {
    if (options.getAbortRequested && (await options.getAbortRequested())) break

    const chunkGenerator = processChunk({
      client,
      account,
      folder,
      chunk: uidList.slice(i, i + CHUNK_UID_COUNT),
      chunkIndex: Math.floor(i / CHUNK_UID_COUNT),
      chunkSize: CHUNK_UID_COUNT,
      folderTotalEmails,
      folderProcessedCount,
      startTime,
      options,
    })
    folderProcessedCount = yield* chunkGenerator
  }

  await emitStatus(
    options,
    `Completed ${folder} on ${account.server}: ${folderProcessedCount.toLocaleString()} emails scanned`,
  )
  if (options.onBatchProgress && folderProcessedCount > 0) {
    await options.onBatchProgress(folderProcessedCount, 0, folderTotalEmails, 0)
  }
}
