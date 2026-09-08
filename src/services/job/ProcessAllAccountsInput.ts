import type { ImapAccountConfig } from '@/types/config'
import type { createJobEventBuffer } from './createJobEventBuffer'
import type { createPollStatusCoalescer } from './createPollStatusCoalescer'
import type { IngestJobTotals } from './IngestJobTotals'

export type ProcessAllAccountsInput = {
  accounts: readonly ImapAccountConfig[]
  days: number
  totals: IngestJobTotals
  coalescer: ReturnType<typeof createPollStatusCoalescer>
  eventBuffer: ReturnType<typeof createJobEventBuffer> | null
  jobRunId: number | undefined
}
