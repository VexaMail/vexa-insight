import type { NotifyProcessingRecordsInput } from '@/types/imap'
import { notifyProgress } from './notifyProgress'

/** Emit one `processing_records` event per record found in a message. */
export async function notifyProcessingRecords({
  options,
  account,
  emailDate,
  subject,
  uidStr,
  count,
}: NotifyProcessingRecordsInput): Promise<void> {
  for (let i = 0; i < count; i++) {
    await notifyProgress(options, {
      accountId: account.id,
      emailDate,
      subject,
      uid: uidStr,
      step: 'processing_records',
    })
  }
}
