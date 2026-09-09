export type ApiKeyNewFieldProps = {
  readonly newKey: string
  readonly onGenerate: () => void
  readonly onNewKeyChange: (value: string) => void
}
