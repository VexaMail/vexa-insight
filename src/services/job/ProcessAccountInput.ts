import type { ImapAccountConfig } from '@/types/config'
import type { EmailProgressPayload } from '@/types/dashboard'
import type { PollStatusCoalescer } from './PollStatusCoalescer'

/** Everything one account's fetch-and-ingest pass needs. */
export type ProcessAccountInput = {
  account: ImapAccountConfig
  accountIndex: number
  totalAccounts: number
  days: number
  totalProcessedSoFar: number
  getAbortRequested: () => Promise<boolean>
  onEmailProgress: (payload: EmailProgressPayload) => Promise<void>
  coalescer: PollStatusCoalescer
  jobRunId: number | undefined
}
