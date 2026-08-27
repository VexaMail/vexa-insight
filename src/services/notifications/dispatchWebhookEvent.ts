import { getDb, webhookEndpoints } from '@/lib/db'
import type { WebhookEvent, WebhookPayload } from '@/types/notifications'
import { eq } from 'drizzle-orm'
import { deliverWebhook } from './deliverWebhook'
import { listWebhookEndpoints } from './listWebhookEndpoints'
import { signWebhookPayload } from './signWebhookPayload'

export async function dispatchWebhookEvent(
  event: WebhookEvent,
  data: Record<string, unknown>,
): Promise<void> {
  const endpoints = listWebhookEndpoints().filter(
    (e) =>
      e.enabled &&
      e.events
        .split(',')
        .map((s) => s.trim())
        .includes(event),
  )
  if (endpoints.length === 0) return

  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    source: 'vexa-mail-insight',
    data,
  }
  const body = JSON.stringify(payload)
  const db = getDb()

  await Promise.all(
    endpoints.map(async (endpoint) => {
      const signature = endpoint.secret
        ? signWebhookPayload(body, endpoint.secret)
        : null
      const result = await deliverWebhook(endpoint.url, body, signature)
      const now = new Date()
      db.update(webhookEndpoints)
        .set({
          lastDispatchAt: now,
          lastStatus: result.status ? String(result.status) : 'error',
          lastError: result.error,
          updatedAt: now,
        })
        .where(eq(webhookEndpoints.id, endpoint.id))
        .run()
    }),
  )
}
