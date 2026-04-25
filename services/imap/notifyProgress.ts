import type { EmailProgressPayload } from '@/types/dashboard'
import type { FetchAttachmentsOptions } from '@/types/imap'

export async function notifyProgress(
  options: FetchAttachmentsOptions,
  payload: EmailProgressPayload,
) {
  if (options.onEmailProgress) {
    await options.onEmailProgress(payload)
  }
}
