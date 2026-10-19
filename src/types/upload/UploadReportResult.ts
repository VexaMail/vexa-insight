/** Outcome of one report upload, already reduced to what the UI shows. */
export type UploadReportResult = {
  status: 'success' | 'error'
  message: string
  /** The stored report, when the server accepted the file. */
  reportId: number | null
}
