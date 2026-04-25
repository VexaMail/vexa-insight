import type { ImapFlow } from 'imapflow'
import type { HandlePostProcessParams } from './HandlePostProcessParams'

export async function handleMoveToTrash(
  client: ImapFlow,
  params: HandlePostProcessParams,
) {
  await client.messageDelete(params.uidStr, { uid: true })
  if (params.onProgress) {
    await params.onProgress({
      accountId: params.accountId,
      emailDate: params.emailDate,
      step: 'moving_to_trash',
      subject: params.subject,
      uid: params.uidStr,
    })
  }
}
