import type { PaginatedProgressItems } from '@/types/dashboard'

/**
 * Shape of `data` from GET /api/v1/poll-status response.
 */
export type PollStatusResponseData = {
  isRunning?: boolean
  lastCheck?: string | null
  currentProcessed?: number
  totalEmails?: number
  processingEmails?: number
  etaMs?: number
  progressItems?: PaginatedProgressItems
  activeJobRunId?: number | null
  statusText?: string | null
}
