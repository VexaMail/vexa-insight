export type FolderPickerToolbarProps = {
  readonly loading: boolean
  readonly onReload: () => Promise<void>
  readonly onToggleCreate: () => void
}
