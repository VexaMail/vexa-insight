export type RecentUpload = {
  id: string
  name: string
  status: 'success' | 'error'
  message: string
  /** Stored report to open, when the upload was accepted. */
  reportId: number | null
  /** When the upload finished, as HH:mm:ss local time. */
  time: string
}
