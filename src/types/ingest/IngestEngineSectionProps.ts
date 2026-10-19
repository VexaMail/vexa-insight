import type { PollStatus } from '@/types/dashboard'
import type { JobRunRow } from '@/types/jobs'
import type { IngestActivityPoint } from './IngestActivityPoint'
import type { IngestHealth } from './IngestHealth'
import type { ProcessedEmail } from './ProcessedEmail'

/** What the ingest page hands its engine section, all read on the server. */
export type IngestEngineSectionProps = {
  readonly health: IngestHealth
  readonly activity: readonly IngestActivityPoint[]
  readonly pollStatus: PollStatus
  readonly displayPollStatus: PollStatus
  readonly jobRuns: JobRunRow[]
  readonly emails: ProcessedEmail[]
  readonly isHistoricalJobContext: boolean
  readonly jobId: number | undefined
  readonly intervalMinutes: number
  readonly initialApiKey: string
  /** Whether the viewer may open Settings to add a mailbox. */
  readonly canConfigure: boolean
}
