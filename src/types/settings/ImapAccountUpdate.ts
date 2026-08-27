/**
 * Single IMAP account in settings update payload. id for existing; password optional (keep current).
 */
export type ImapAccountUpdate = {
  id?: number | undefined
  label: string
  server: string
  port: number
  username: string
  password?: string | undefined
  fetchIncludeTrash?: boolean | undefined
  fetchIncludeAllFolders?: boolean | undefined
  postProcessAction?: string | undefined
  postProcessFolder?: string | null | undefined
  moveToTrashAfterProcess?: boolean | undefined
  markAsReadAfterProcess?: boolean | undefined
}
