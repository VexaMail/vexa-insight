import type { ImapAccountConfig } from '@/types/config'
import type { AttachmentResult, FetchAttachmentsOptions } from '@/types/imap'
import { buildDmarcSearchQuery } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'
import { emitStatus } from './emitStatus'
import { processChunk } from './processChunk'

export async function* processFolder(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
  since: Date,
  options: FetchAttachmentsOptions,
): AsyncGenerator<AttachmentResult> {
  await emitStatus(
    options,
    `Searching for DMARC emails in ${folder} on ${account.server}\u2026`,
  )

  const uids = await client.search(buildDmarcSearchQuery(since), { uid: true })
  const uidList = Array.isArray(uids) ? uids : []
  const PARALLEL_EMAILS = 100
  let folderProcessedCount = 0
  const folderTotalEmails = uidList.length
  const startTime = Date.now()

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

  for (let i = 0; i < uidList.length; i += PARALLEL_EMAILS) {
    if (options.getAbortRequested && (await options.getAbortRequested())) break
    const chunk = uidList.slice(i, i + PARALLEL_EMAILS)
    const chunkIndex = Math.floor(i / PARALLEL_EMAILS)

    const gen = processChunk(
      client,
      account,
      folder,
      chunk,
      chunkIndex,
      PARALLEL_EMAILS,
      folderTotalEmails,
      folderProcessedCount,
      startTime,
      options,
    )

    let result = await gen.next()
    while (!result.done) {
      yield result.value
      result = await gen.next()
    }
    folderProcessedCount = result.value
  }

  await emitStatus(
    options,
    `Completed ${folder} on ${account.server}: ${folderProcessedCount.toLocaleString()} emails scanned`,
  )

  if (options.onBatchProgress && folderProcessedCount > 0) {
    await options.onBatchProgress(folderProcessedCount, 0, folderTotalEmails, 0)
  }
}
