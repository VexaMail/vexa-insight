/** State of the overview's "Trigger now" action. */
export type UseTriggerIngestReturn = {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
  trigger: () => void
}
