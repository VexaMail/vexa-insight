import type { ImapAccountConfig } from '@/types/config'
import type { FetchAttachmentsOptions } from '@/types/imap'
import { notifyProgress } from './notifyProgress'

export async function notifyProcessingRecords(
  options: FetchAttachmentsOptions,
  account: ImapAccountConfig,
  emailDate: string | undefined,
  subject: string | undefined,
  uidStr: string,
  count: number,
) {
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
