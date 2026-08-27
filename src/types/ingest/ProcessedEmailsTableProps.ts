import type { ProcessedEmail } from './ProcessedEmail'

export type ProcessedEmailsTableProps = {
  emails: ProcessedEmail[]
  selectedJobId?: number | null
}
