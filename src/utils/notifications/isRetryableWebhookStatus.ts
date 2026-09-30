/** Whether an HTTP status is worth retrying: 429 or any 5xx. */
export function isRetryableWebhookStatus(status: number): boolean {
  return status === 429 || status >= 500
}
