import { insertProcessedMessage } from '@/services/processed-messages'
import type { FinalizeProcessedMessageInput } from '@/types/imap'
import { handlePostProcessAndReport } from '@/utils/imap'
import { notifyProcessingRecords } from './notifyProcessingRecords'
import { notifyProgress } from './notifyProgress'

/** Records the message as processed and applies the account's post-processing. */
export async function finalizeProcessedMessage(
  input: FinalizeProcessedMessageInput,
): Promise<void> {
  const { account, client, emailDate, folder, options, subject, uidStr } = input
  const progress = {
    accountId: account.id,
    emailDate,
    subject,
    uid: uidStr,
  }

  await notifyProgress(options, { ...progress, step: 'dmarc_detected' })
  await notifyProcessingRecords({
    options,
    account,
    emailDate,
    subject,
    uidStr,
    count: input.attachmentCount,
  })
  await insertProcessedMessage(account.id, input.messageId, options.jobRunId)
  await handlePostProcessAndReport({
    accountId: account.id,
    client,
    context: 'processed',
    emailDate,
    markAsReadAfterProcess: options.markAsReadAfterProcess,
    moveToTrashAfterProcess: options.moveToTrashAfterProcess,
    onProgress: options.onEmailProgress,
    postProcessAction: options.postProcessAction,
    postProcessFolder: options.postProcessFolder ?? null,
    sourceFolder: folder,
    subject,
    trashPath: options.trashPath ?? null,
    uidStr,
  })
  await notifyProgress(options, { ...progress, step: 'done' })
}
