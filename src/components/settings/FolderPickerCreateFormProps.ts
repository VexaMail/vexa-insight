export type FolderPickerCreateFormProps = {
  readonly newFolderPath: string
  readonly creating: boolean
  readonly createError: string | null
  readonly onPathChange: (value: string) => void
  readonly onCreate: () => Promise<void>
  readonly onCancel: () => void
}
