/**
 * IMAP account as returned in public settings (password masked).
 */
export type ImapAccountPublic = {
  id: number
  label: string
  server: string
  port: number
  username: string
  passwordMasked: boolean
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  postProcessAction: string
  postProcessFolder: string | null
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
}
