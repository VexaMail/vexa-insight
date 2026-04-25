import type { ProgressItem } from '@/types/dashboard'
import type { IngestTab } from './IngestTab'

export type IngestState = {
  selectedJobId: number | null
  activeTab: IngestTab

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

  page: number
  pageSize: number
  progressItems: ProgressItem[]
  progressTotal: number
  jobStartTime: number | null
}
