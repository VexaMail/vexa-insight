export type ApiKeySectionProps = {
  readonly apiKey: string
  readonly newKey: string
  readonly onCopy: () => void
  readonly onGenerate: () => void
  readonly onNewKeyChange: (value: string) => void
}
