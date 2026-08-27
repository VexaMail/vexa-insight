import type { ImapFlow } from 'imapflow'
import type { HandlePostProcessParams } from './HandlePostProcessParams'

/**
 * Moves a processed message to the mailbox flagged \\Trash.
 *
 * This is a MOVE, not a delete: the setting, its UI label and the
 * `moving_to_trash` progress step all promise the operator a recoverable
 * message, so a server with no \\Trash mailbox must leave the message where it
 * is rather than destroy it. The thrown error is caught and logged by
 * `handlePostProcessAndReport`.
 */
export async function handleMoveToTrash(
  client: ImapFlow,
  params: HandlePostProcessParams,
) {
  if (!params.trashPath) {
    throw new Error(
      'no mailbox has the \\Trash special-use attribute; leaving the message in place',
    )
  }
  if (params.trashPath === params.sourceFolder) return
  await client.messageMove(params.uidStr, params.trashPath, { uid: true })
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
