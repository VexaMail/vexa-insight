export type WebhookEndpointRow = {
  id: number
  name: string
  url: string
  enabled: boolean
  events: string
  secret: string | null
  lastDispatchAt: Date | null
  lastStatus: string | null
  lastError: string | null
  createdAt: Date
  updatedAt: Date
}
