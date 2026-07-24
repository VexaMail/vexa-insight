import { getDb, webhookEndpoints } from '@/lib/db'
import type { WebhookEndpointRow } from '@/types/notifications'
import type { WebhookEndpointInput } from '@/validators/webhooks'

/**
 * Inserts a webhook endpoint and returns the created row.
 */
export function createWebhookEndpoint(
  input: WebhookEndpointInput,
): WebhookEndpointRow {
  const db = getDb()
  const now = new Date()
  return db
    .insert(webhookEndpoints)
    .values({
      name: input.name,
      url: input.url,
      enabled: input.enabled,
      events: input.events.join(','),
      secret: input.secret ?? null,
      createdAt: now,
      updatedAt: now,
    })
    .returning()
    .get()
}
