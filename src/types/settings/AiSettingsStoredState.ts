/** What the server knows about the AI provider, mirrored in the form. */
export type AiSettingsStoredState = {
  readonly apiKeyMasked: string | null
  readonly setApiKeyMasked: (masked: string | null) => void
  readonly isConfigured: boolean
  readonly setIsConfigured: (configured: boolean) => void
}
