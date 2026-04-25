/**
 * Props for the trigger poll form component.
 */
export type TriggerPollFormProps = {
  className?: string
  /** When true and initialApiKey is set, the API key input is hidden (e.g. inside Crons section). */
  hideApiKeyWhenPrefilled?: boolean
  initialApiKey?: string
}
