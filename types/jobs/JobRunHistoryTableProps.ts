import type { JobRunRow } from '@/types/jobs'

export type JobRunHistoryTableProps = {
  runs: JobRunRow[]
  isRunning?: boolean
  currentProcessed?: number
  activeJobRunId?: number | null | undefined
}
