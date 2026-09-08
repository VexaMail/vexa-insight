import type { ImapFlow } from 'imapflow'

/** A held mailbox lock together with the client that holds it. */
export type FolderLock = {
  client: ImapFlow
  lock: { release: () => void }
}
