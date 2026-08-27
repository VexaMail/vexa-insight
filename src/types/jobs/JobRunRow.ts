export type JobRunRow = {
  id: number
  runAt: Date
  success: boolean
  processed: number
  ingested: number
  errorCount: number
}
