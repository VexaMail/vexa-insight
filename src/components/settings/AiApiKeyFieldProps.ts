export type AiApiKeyFieldProps = {
  readonly value: string
  readonly apiKeyMasked: string | null
  readonly providerPlaceholder: string | undefined
  readonly onChange: (value: string) => void
}
