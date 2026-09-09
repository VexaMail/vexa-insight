export type UseCreateImapFolderReturn = {
  readonly newFolderPath: string
  readonly showCreate: boolean
  readonly creating: boolean
  readonly createError: string | null
  readonly handleCreate: () => Promise<void>
  readonly handleNewFolderPathChange: (value: string) => void
  readonly handleToggleShowCreate: () => void
  readonly handleCancelCreate: () => void
}
