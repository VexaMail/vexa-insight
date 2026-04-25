export type ImapAccountRow = {
  id: number
  label: string
  server: string
  port: number
  username: string
  password: string
  sortOrder: number
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  postProcessAction: string
  postProcessFolder: string | null
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
}
