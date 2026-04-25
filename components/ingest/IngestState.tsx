import type { ProgressItem } from '@/types/dashboard'

import type { IngestTab } from '../../types/IngestTab'

export type IngestState = {
  // UI Selection State
  selectedJobId: number | null
  activeTab: IngestTab

  // Engine State
  isRunning: boolean
  lastCheck: string | Date | null
  currentProcessed: number
  totalEmails: number
  processingEmails: number
  etaMs: number
  abortStatus: 'idle' | 'loading' | 'success' | 'error'
  runRequested: boolean
  activeJobRunId: number | null
  statusText: string | null

  // Progress Pagination State
  page: number
  pageSize: number
  progressItems: ProgressItem[]
  progressTotal: number
  jobStartTime: number | null
}
