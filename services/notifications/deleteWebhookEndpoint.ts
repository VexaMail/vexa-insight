import { getDb, webhookEndpoints } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Deletes a webhook endpoint by id.
 */
export function deleteWebhookEndpoint(id: number): void {
  const db = getDb()
  db.delete(webhookEndpoints).where(eq(webhookEndpoints.id, id)).run()
}
