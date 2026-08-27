import type { ImapAccountConfig } from '@/types/config'
import { createClient } from './createClient'

export async function createFolder(
  account: ImapAccountConfig,
  folderPath: string,
): Promise<string> {
  const client = createClient(account)
  await client.connect()
  try {
    await client.mailboxCreate(folderPath)
    return folderPath
  } finally {
    await client.logout()
  }
}
