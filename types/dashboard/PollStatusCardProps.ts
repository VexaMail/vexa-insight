/**
 * Props for the poll status card component.
 */
export type PollStatusCardProps = {
  isRunning: boolean
  lastCheck: string | null
  currentProcessed: number
  totalEmails: number
  processingEmails: number
  etaMs: number
}
