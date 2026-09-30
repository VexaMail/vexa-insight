import { getDb, webhookEndpoints } from '@/lib/db'
import type { WebhookEvent, WebhookPayload } from '@/types/notifications'
import { eq } from 'drizzle-orm'
import { deliverWebhookWithRetry } from './deliverWebhookWithRetry'
import { listWebhookEndpoints } from './listWebhookEndpoints'
import { signWebhookPayload } from './signWebhookPayload'

/**
 * Sends an event to every enabled endpoint subscribed to it and records each
 * outcome on the endpoint row. `retryDelaysMs` defaults to the backoff
 * schedule; pass `[]` for a single attempt where a caller waits on the result.
 */
export async function dispatchWebhookEvent(
  event: WebhookEvent,
  data: Record<string, unknown>,
  retryDelaysMs?: readonly number[],
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
    source: 'vexa-insight',
    data,
  }
  const body = JSON.stringify(payload)
  const db = getDb()

  await Promise.all(
    endpoints.map(async (endpoint) => {
      const signature = endpoint.secret
        ? signWebhookPayload(body, endpoint.secret)
        : null
      const result = await deliverWebhookWithRetry(
        { url: endpoint.url, body, signature },
        retryDelaysMs,
      )
      const now = new Date()
      db.update(webhookEndpoints)
        .set({
          lastDispatchAt: now,
          lastStatus: result.status ? String(result.status) : 'error',
          lastError: result.error,
          lastAttempts: result.attempts,
          updatedAt: now,
        })
        .where(eq(webhookEndpoints.id, endpoint.id))
        .run()
    }),
  )
}
