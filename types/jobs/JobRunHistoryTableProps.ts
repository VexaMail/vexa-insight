import type { JobRunRow } from './JobRunRow'

export type JobRunHistoryTableProps = {
  runs: JobRunRow[]
  isRunning?: boolean
  currentProcessed?: number
  activeJobRunId?: number | null | undefined
}
