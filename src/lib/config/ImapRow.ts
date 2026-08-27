export type ImapRow = {
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
