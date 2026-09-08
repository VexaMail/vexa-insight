import type { ImapAccountFormEntry } from '@/types/settings'

/**
 * One account as the settings endpoint expects it: `id` only for rows that
 * already exist, `password` only when the user typed a new one.
 */
export function toImapAccountPayload(
  account: ImapAccountFormEntry,
): Record<string, unknown> {
  return {
    ...(account.id > 0 ? { id: account.id } : {}),
    label: account.label,
    server: account.server,
    port: account.port,
    username: account.username,
    fetchIncludeTrash: account.fetchIncludeTrash,
    fetchIncludeAllFolders: account.fetchIncludeAllFolders,
    postProcessAction: account.postProcessAction,
    postProcessFolder: account.postProcessFolder ?? null,
    moveToTrashAfterProcess: account.moveToTrashAfterProcess,
    markAsReadAfterProcess: account.markAsReadAfterProcess,
    ...(account.passwordNew?.trim() ? { password: account.passwordNew } : {}),
  }
}
