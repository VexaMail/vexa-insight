import type { ProcessedEmail } from './ProcessedEmail'

export type ProcessedEmailModalProps = {
  readonly email: ProcessedEmail
  readonly emails: ProcessedEmail[]
  readonly contentLoading: boolean
  readonly fileContent: string | null
  readonly contentError: string | null
  readonly onView: (email: ProcessedEmail) => void
  readonly onClose: () => void
}
