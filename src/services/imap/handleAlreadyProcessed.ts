import type { HandleAlreadyProcessedInput } from '@/types/imap'
import { handlePostProcessAndReport } from '@/utils/imap'

/** Report and post-process a message already in processed_messages. */
export async function handleAlreadyProcessed({
  client,
  account,
  folder,
  uid,
  info,
  options,
}: HandleAlreadyProcessedInput): Promise<void> {
  const progress = {
    accountId: account.id,
    emailDate: info.date,
    subject: info.subject,
    uid: String(uid),
  }

  if (options.onEmailProgress) {
    await options.onEmailProgress({ ...progress, step: 'already_processed' })
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
    trashPath: options.trashPath ?? null,
    uidStr: String(uid),
  })

  if (options.onEmailProgress) {
    await options.onEmailProgress({ ...progress, step: 'done' })
  }
}
