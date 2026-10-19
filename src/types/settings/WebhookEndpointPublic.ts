/** A webhook endpoint as `GET /api/v1/admin/webhooks` returns it. */
export type WebhookEndpointPublic = {
  readonly id: number
  readonly name: string
  readonly url: string
  readonly enabled: boolean
  readonly events: readonly string[]
  /** Masked by the API; null when no signing secret is stored. */
  readonly secret: string | null
  /** ISO timestamp of the last delivery attempt. */
  readonly lastDispatchAt: string | null
  /** HTTP status of the last delivery, or `error` for a network failure. */
  readonly lastStatus: string | null
  readonly lastError: string | null
  readonly lastAttempts: number | null
}
