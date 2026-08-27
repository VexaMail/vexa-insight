import type { WebhookEvent } from './WebhookEvent'

export type WebhookPayload = {
  event: WebhookEvent
  timestamp: string
  data: Record<string, unknown>
  source: 'vexa-mail-insight'
}
