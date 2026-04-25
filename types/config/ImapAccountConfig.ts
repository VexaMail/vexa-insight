/**
 * IMAP account credentials used for createClient and ingest.
 * id is required for processed_messages (imap_account_id).
 */
export type ImapAccountConfig = {
  id: number
  server: string
  port: number
  username: string
  password: string
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  postProcessAction: string
  postProcessFolder: string | null
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
}
