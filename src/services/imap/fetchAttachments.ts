import type { ImapAccountConfig } from '@/types/config'
import type {
  AttachmentResult,
  FetchAttachmentsOptions,
  MailboxListItem,
} from '@/types/imap'
import { buildFetchAttachmentsContext, getTrashPath } from '@/utils/imap'
import { createClient } from './createClient'
import { lockFolderWithReconnect } from './lockFolderWithReconnect'
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

      const held = await lockFolderWithReconnect(client, account, folder)
      client = held.client
      try {
        yield* processFolder({
          client,
          account,
          folder,
          since,
          options: folderOptions,
        })
      } finally {
        held.lock.release()
      }
    }
  } finally {
    await client.logout()
  }
}
