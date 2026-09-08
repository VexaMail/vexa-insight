import type { ImapAccountConfig } from '@/types/config'
import type { FolderLock } from '@/types/imap'
import { isNoConnectionError } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'
import { createClient } from './createClient'

/**
 * Lock a mailbox, reconnecting once when the server has closed the connection
 * (which it does after a MOVE to Trash). Returns the client holding the lock,
 * which is a new one whenever the reconnect happened.
 */
export async function lockFolderWithReconnect(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
): Promise<FolderLock> {
  try {
    return { client, lock: await client.getMailboxLock(folder) }
  } catch (err) {
    if (!isNoConnectionError(err)) throw err
  }

  try {
    await client.logout()
  } catch {
    /* ignore */
  }

  const reconnected = createClient(account)
  await reconnected.connect()

  return { client: reconnected, lock: await reconnected.getMailboxLock(folder) }
}
