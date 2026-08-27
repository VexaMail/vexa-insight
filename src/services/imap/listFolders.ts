import type { ImapAccountConfig } from '@/types/config'
import { createClient } from './createClient'
import type { ImapFolderInfo } from './ImapFolderInfo'

/**
 * Connects to IMAP and returns all available mailbox folders.
 */
export async function listFolders(
  account: ImapAccountConfig,
): Promise<ImapFolderInfo[]> {
  const client = createClient(account)
  await client.connect()
  try {
    const list = await client.list()
    return list.map((mb) => ({
      path: mb.path,
      name: mb.name,
      delimiter: mb.delimiter,
      flags: mb.flags,
      ...(mb.specialUse !== undefined ? { specialUse: mb.specialUse } : {}),
    }))
  } finally {
    await client.logout()
  }
}
