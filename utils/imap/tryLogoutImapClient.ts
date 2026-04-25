import type { ImapFlow } from 'imapflow'

/**
 * Attempts to log out the IMAP client. Ignores errors (e.g. already closed).
 * Use before replacing a dead client with a new connection.
 */
export async function tryLogoutImapClient(client: ImapFlow): Promise<void> {
  try {
    await client.logout()
  } catch {
    /* ignore */
  }
}
