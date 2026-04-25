/**
 * Options for getImapTotalCount: same folder/since semantics as fetchAttachments.
 */
export type GetImapTotalCountOptions = {
  postProcessAction: string
  postProcessFolder: string | null
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
}
