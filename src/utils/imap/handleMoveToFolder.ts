import type { ImapFlow } from 'imapflow'
import type { HandlePostProcessParams } from './HandlePostProcessParams'

export async function handleMoveToFolder(
  client: ImapFlow,
  params: HandlePostProcessParams,
) {
  if (
    !params.postProcessFolder ||
    params.postProcessFolder === params.sourceFolder
  )
    return
  await client.messageMove(params.uidStr, params.postProcessFolder, {
    uid: true,
  })
  if (params.onProgress) {
    await params.onProgress({
      accountId: params.accountId,
      emailDate: params.emailDate,
      step: 'moving_to_folder',
      subject: params.subject,
      uid: params.uidStr,
    })
  }
}
