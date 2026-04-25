import type { ImapAccountConfig } from '@/types/config'
import type { FetchAttachmentsOptions } from '@/types/imap'
import { handlePostProcessAndReport } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'
import type { UidInfo } from './UidInfo'

export async function handleAlreadyProcessed(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
  uid: number,
  info: UidInfo,
  options: FetchAttachmentsOptions,
) {
  if (options.onEmailProgress) {
    await options.onEmailProgress({
      accountId: account.id,
      emailDate: info.date,
      subject: info.subject,
      uid: String(uid),
      step: 'already_processed',
    })
  }
  await handlePostProcessAndReport({
    accountId: account.id,
    client,
    context: 'already processed',
    emailDate: info.date,
    markAsReadAfterProcess: options.markAsReadAfterProcess,
    moveToTrashAfterProcess: options.moveToTrashAfterProcess,
    onProgress: options.onEmailProgress,
    postProcessAction: options.postProcessAction,
    postProcessFolder: options.postProcessFolder ?? null,
    sourceFolder: folder,
    subject: info.subject,
    uidStr: String(uid),
  })
  if (options.onEmailProgress) {
    await options.onEmailProgress({
      accountId: account.id,
      emailDate: info.date,
      subject: info.subject,
      uid: String(uid),
      step: 'done',
    })
  }
}
