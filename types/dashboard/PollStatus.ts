import type { PaginatedProgressItems } from '@/types/dashboard/PaginatedProgressItems'

export type PollStatus = {
  isRunning: boolean
  lastCheck: string | null
  currentProcessed: number
  totalEmails: number
  processingEmails: number
  etaMs: number
  abortRequested?: boolean
  progressItems: PaginatedProgressItems
  activeJobRunId?: number | null
  statusText?: string | null
}
