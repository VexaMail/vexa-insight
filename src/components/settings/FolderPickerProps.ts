export type FolderPickerProps = {
  readonly accountId: number
  readonly apiKey: string
  readonly value: string | null
  readonly onChange: (path: string | null) => void
}
