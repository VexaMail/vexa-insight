import type { PollStatusResponseData } from '@/types/ingest'
import type { IngestState } from './IngestState'

import type { IngestTab } from '../../types/IngestTab'

export type IngestActions = {
  setSelectedJob: (id: number | null) => void
  setActiveTab: (tab: IngestTab) => void
  setIsJobRunning: (running: boolean) => void

  applyPollStatus: (data: PollStatusResponseData) => void
  setAbortStatus: (status: IngestState['abortStatus']) => void
  setRunRequested: (requested: boolean) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
}
