import type { ImapAccountConfig } from '@/types/config'
import { ImapFlow } from 'imapflow'

/**
 * Creates an ImapFlow client for the given account (not connected).
 */
export function createClient(account: ImapAccountConfig): ImapFlow {
  const { server, port, username, password } = account
  const client = new ImapFlow({
    host: server,
    port,
    secure: port === 993,
    auth: { user: username, pass: password },
  })
  return client
}
