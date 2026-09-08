/** Outcome of one poll trigger, reduced to what the form shows. */
export type TriggerPollResult = {
  status: 'success' | 'error'
  message: string
}
