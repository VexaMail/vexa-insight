import type { ImapAccountConfig } from '@/types/config'
import type {
  AttachmentResult,
  FetchAttachmentsOptions,
  MailboxListItem,
} from '@/types/imap'
import {
  buildFetchAttachmentsContext,
  getTrashPath,
  isNoConnectionError,
} from '@/utils/imap'
import { createClient } from './createClient'
import { processFolder } from './processFolder'

/**
 * Fetches emails from configured folders (INBOX + optional Trash + optional all).
 * Skips messages already in processed_messages by Message-ID.
 * Yields DMARC attachments; after success inserts processed_messages and optionally moves to Trash.
 * Reconnects once per folder if the server closes the connection (e.g. after MOVE to Trash).
 */
export async function* fetchAttachments(
  days: number,
  account: ImapAccountConfig,
  options: FetchAttachmentsOptions,
): AsyncGenerator<AttachmentResult> {
  if (options.onStatus) {
    await options.onStatus(`Connecting to ${account.server}...`)
  }
  let client = createClient(account)
  await client.connect()
  const mailboxes = (await client.list()) as MailboxListItem[]
  const { since, folders } = buildFetchAttachmentsContext(
    days,
    mailboxes,
    options,
  )
  // The trash mailbox is only knowable once the server has listed its
  // mailboxes, so it is resolved here rather than by the caller.
  const folderOptions = { ...options, trashPath: getTrashPath(mailboxes) }
  try {
    for (const folder of folders) {
      if (options.getAbortRequested && (await options.getAbortRequested()))
        break

      if (options.onStatus) {
        await options.onStatus(
          `Scanning folder ${folder} on ${account.server}...`,
        )
      }

      let lock: { release: () => void }
      try {
        lock = await client.getMailboxLock(folder)
      } catch (e) {
        if (!isNoConnectionError(e)) throw e
        try {
          await client.logout()
        } catch {
          /* ignore */
        }
        client = createClient(account)
        await client.connect()
        lock = await client.getMailboxLock(folder)
      }
      try {
        yield* processFolder(client, account, folder, since, folderOptions)
      } finally {
        lock.release()
      }
    }
  } finally {
    await client.logout()
  }
}
