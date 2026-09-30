/**
 * Outcome of one webhook POST. `retryable` is true only for failures a later
 * attempt can fix: a network error or timeout, HTTP 429 and 5xx.
 */
export type WebhookDeliveryResult = {
  status: number | null
  error: string | null
  retryable: boolean
}
