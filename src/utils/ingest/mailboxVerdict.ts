import type { HealthVerdict, MailboxHealth } from '@/types/ingest'

/** A mailbox fails when its newest event is an error, not a clean poll. */
export function mailboxVerdict(mailbox: MailboxHealth): HealthVerdict {
  const ok = mailbox.lastSuccessAt?.getTime() ?? 0
  const err = mailbox.lastErrorAt?.getTime() ?? 0
  if (err > ok) return { tone: 'danger', label: 'Last poll failed' }
  if (ok === 0) return { tone: 'unknown', label: 'No polls logged' }
  return { tone: 'success', label: 'Reachable' }
}
