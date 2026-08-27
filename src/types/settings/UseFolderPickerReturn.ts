import type { FolderState } from './FolderState'

export type UseFolderPickerReturn = {
  readonly createError: string | null
  readonly creating: boolean
  readonly handleCancelCreate: () => void
  readonly handleCreate: () => Promise<void>
  readonly handleLoadFolders: () => Promise<void>
  readonly handleNewFolderPathChange: (value: string) => void
  readonly handleToggleShowCreate: () => void
  readonly hasLoaded: boolean
  readonly newFolderPath: string
  readonly showCreate: boolean
  readonly state: FolderState
}
