import { getDb, webhookEndpoints } from '@/lib/db'
import type { WebhookEndpointRow } from '@/types/notifications'

export function listWebhookEndpoints(): WebhookEndpointRow[] {
  const db = getDb()
  return db.select().from(webhookEndpoints).all()
}
