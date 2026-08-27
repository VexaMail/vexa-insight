import { getDb, webhookEndpoints } from '@/lib/db'
import type { WebhookEndpointUpdateInput } from '@/validators/webhooks'
import { eq } from 'drizzle-orm'

/**
 * Applies a partial update to a webhook endpoint. Only fields present in
 * the input are written; `updatedAt` is always refreshed.
 */
export function updateWebhookEndpoint(
  id: number,
  input: WebhookEndpointUpdateInput,
): void {
  const db = getDb()
  const updates: Record<string, unknown> = { updatedAt: new Date() }
  if (input.name !== undefined) updates.name = input.name
  if (input.url !== undefined) updates.url = input.url
  if (input.enabled !== undefined) updates.enabled = input.enabled
  if (input.events !== undefined) updates.events = input.events.join(',')
  if (input.secret !== undefined) updates.secret = input.secret
  db.update(webhookEndpoints)
    .set(updates)
    .where(eq(webhookEndpoints.id, id))
    .run()
}
