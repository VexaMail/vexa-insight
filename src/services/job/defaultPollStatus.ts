import type { PollStatus } from '@/types/dashboard'

export const DEFAULT_POLL_STATUS: PollStatus = {
  isRunning: false,
  lastCheck: null,
  currentProcessed: 0,
  totalEmails: 0,
  processingEmails: 0,
  etaMs: 0,
  progressItems: { items: [], total: 0, page: 1, pageSize: 50 },
  activeJobRunId: null,
}
