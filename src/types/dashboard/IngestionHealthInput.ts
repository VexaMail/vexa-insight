import type { JobRunRow } from '@/types/jobs'

/** Raw facts `buildIngestionHealth` turns into a health verdict. */
export type IngestionHealthInput = {
  intervalMinutes: number
  hasImapAccount: boolean
  isRunning: boolean
  latestRun: JobRunRow | null
  lastSuccessAtMs: number | null
  newestReportDay: number | null
  nowMs: number
}
