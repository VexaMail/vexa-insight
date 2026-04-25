import type { ProcessedEmail } from '../../types/ingest/ProcessedEmail'

export type GetProcessedEmailsColumnsParams = {
  onViewEmail: (email: ProcessedEmail) => void
}
