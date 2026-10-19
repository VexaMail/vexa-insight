import type { HealthVerdict, MailboxHealth } from '@/types/ingest'
import { mailboxVerdict } from './mailboxVerdict'

/** Every mailbox together: any failing one makes the dimension fail. */
export function mailboxesVerdict(mailboxes: MailboxHealth[]): HealthVerdict {
  if (mailboxes.length === 0) {
    return { tone: 'unknown', label: 'None configured' }
  }
  const failing = mailboxes.filter(
    (m) => mailboxVerdict(m).tone === 'danger',
  ).length
  if (failing > 0) {
    return {
      tone: 'danger',
      label: `${String(failing)} of ${String(mailboxes.length)} failing`,
    }
  }
  const unknown = mailboxes.some((m) => mailboxVerdict(m).tone === 'unknown')
  if (unknown) return { tone: 'unknown', label: 'Not polled yet' }
  return { tone: 'success', label: 'All reachable' }
}
