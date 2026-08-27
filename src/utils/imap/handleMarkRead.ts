import type { ImapFlow } from 'imapflow'
import type { HandlePostProcessParams } from './HandlePostProcessParams'

export async function handleMarkRead(
  client: ImapFlow,
  params: HandlePostProcessParams,
) {
  await client.messageFlagsAdd(params.uidStr, ['\\Seen'], { uid: true })
  if (params.onProgress) {
    await params.onProgress({
      accountId: params.accountId,
      emailDate: params.emailDate,
      step: 'marking_read',
      subject: params.subject,
      uid: params.uidStr,
    })
  }
}
