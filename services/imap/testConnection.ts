import type { ImapAccountConfig } from '@/types/config'
import { createClient } from './createClient'
import type { TestConnectionResult } from './TestConnectionResult'

/**
 * Tests IMAP connection for the given account: connect, open INBOX, then logout.
 */
export async function testConnection(
  account: ImapAccountConfig,
): Promise<TestConnectionResult> {
  const client = createClient(account)
  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')
    try {
      // Mailbox open; connection works
    } finally {
      lock.release()
    }
    await client.logout()
    return { success: true, message: 'Connection successful' }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    try {
      await client.logout()
    } catch {
      // ignore
    }
    return { success: false, message: `Connection failed: ${message}` }
  }
}
