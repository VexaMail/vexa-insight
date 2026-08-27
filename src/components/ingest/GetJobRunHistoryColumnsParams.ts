import type { JobRunRow } from './JobRunRow'

export type GetJobRunHistoryColumnsParams = {
  runs: JobRunRow[]
  isGlobalRunning: boolean
  activeJobRunId?: number | null
  currentProcessed: number
}
