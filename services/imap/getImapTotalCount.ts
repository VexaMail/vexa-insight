import type { ImapAccountConfig } from '@/types/config'
import type { GetImapTotalCountOptions, MailboxListItem } from '@/types/imap'
import {
  buildDmarcSearchQuery,
  buildFetchAttachmentsContext,
  isNoConnectionError,
  tryLogoutImapClient,
} from '@/utils/imap'
import { createClient } from './createClient'

/**
 * Returns the total count of emails to process via IMAP for one account,
 * using the same folders and since date as fetchAttachments.
 *
 * Connects, lists mailboxes, builds context (since + folders) via
 * buildFetchAttachmentsContext, then for each folder: acquires mailbox lock,
 * runs DMARC search, counts UIDs, releases lock. Sums counts and disconnects.
 *
 * Error behavior: throws on connect, list, or per-folder lock/search errors.
 * Callers (e.g. runIngestJob) should catch and treat a failed account as 0
 * when summing totals if desired.
 *
 * @param days - Number of days back for since date (same as getSinceDate(days)).
 * @param account - IMAP account config.
 * @param options - Folder selection and move-to-trash option (same shape as fetchAttachments).
 * @returns Total UID count across all folders.
 */
export async function getImapTotalCount(
  days: number,
  account: ImapAccountConfig,
  options: GetImapTotalCountOptions,
): Promise<number> {
  let client = createClient(account)
  await client.connect()
  const mailboxes = (await client.list()) as MailboxListItem[]
  const { since, folders } = buildFetchAttachmentsContext(
    days,
    mailboxes,
    options,
  )
  let total = 0
  try {
    for (const folder of folders) {
      let lock: { release: () => void }
      try {
        lock = await client.getMailboxLock(folder)
      } catch (e) {
        if (!isNoConnectionError(e)) throw e
        await tryLogoutImapClient(client)
        client = createClient(account)
        await client.connect()
        lock = await client.getMailboxLock(folder)
      }
      try {
        const uids = await client.search(buildDmarcSearchQuery(since), {
          uid: true,
        })
        const uidList = Array.isArray(uids) ? uids : []
        total += uidList.length
      } finally {
        lock.release()
      }
    }
  } finally {
    await client.logout()
  }
  return total
}
