import type { IngestFreshness } from '@/types/health'
import type { IngestRunHealth } from './IngestRunHealth'
import type { MailboxHealth } from './MailboxHealth'
import type { ReportFreshness } from './ReportFreshness'

/** The four health dimensions of ingestion, read at one instant. */
export type IngestHealth = {
  readonly now: Date
  readonly intervalMinutes: number
  /** `idle` when no mailbox is complete enough to schedule. */
  readonly scheduler: IngestFreshness
  readonly nextRunAt: Date | null
  readonly isRunning: boolean
  readonly runs: IngestRunHealth
  readonly mailboxes: MailboxHealth[]
  readonly reports: ReportFreshness
}
