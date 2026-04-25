import type { HandlePostProcessParams } from './HandlePostProcessParams'
import { handleMarkRead } from './handleMarkRead'
import { handleMoveToFolder } from './handleMoveToFolder'
import { handleMoveToTrash } from './handleMoveToTrash'

export async function handlePostProcessAndReport(
  params: HandlePostProcessParams,
): Promise<void> {
  const {
    client,
    context,
    accountId,
    uidStr,
    markAsReadAfterProcess,
    moveToTrashAfterProcess,
    postProcessAction,
  } = params

  const hasAnyAction =
    markAsReadAfterProcess ||
    moveToTrashAfterProcess ||
    postProcessAction === 'move_to_folder'

  if (!hasAnyAction) return

  try {
    if (markAsReadAfterProcess) {
      await handleMarkRead(client, params)
    }
    if (postProcessAction === 'move_to_folder') {
      await handleMoveToFolder(client, params)
    } else if (moveToTrashAfterProcess) {
      await handleMoveToTrash(client, params)
    }
  } catch (err) {
    console.error(
      `[ingest] post-process failed (${context}):`,
      accountId,
      uidStr,
      err,
    )
  }
}
