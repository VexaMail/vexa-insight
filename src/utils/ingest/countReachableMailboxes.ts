import type { MailboxHealth } from '@/types/ingest'
import { mailboxVerdict } from './mailboxVerdict'

/** How many mailboxes answered their newest poll cleanly. */
export function countReachableMailboxes(
  mailboxes: readonly MailboxHealth[],
): number {
  return mailboxes.filter((m) => mailboxVerdict(m).tone === 'success').length
}
