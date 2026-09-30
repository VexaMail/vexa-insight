import { WEBHOOK_RETRY_DELAYS_MS } from '@/constants/notifications'
import type { WebhookDeliveryResult } from '@/types/notifications'
import { sleep } from '@/utils/async'
import { deliverWebhook } from './deliverWebhook'

/**
 * Delivers a webhook, retrying transient failures after each delay in
 * `delaysMs` (exponential backoff by default). A non-retryable failure or a
 * success ends it at once. Returns the last result and the attempts made.
 */
export async function deliverWebhookWithRetry(
  request: { url: string; body: string; signature: string | null },
  delaysMs: readonly number[] = WEBHOOK_RETRY_DELAYS_MS,
  wait: (ms: number) => Promise<void> = sleep,
): Promise<WebhookDeliveryResult & { attempts: number }> {
  let attempts = 1
  let result = await deliverWebhook(
    request.url,
    request.body,
    request.signature,
  )
  for (const delay of delaysMs) {
    if (!result.retryable) break
    await wait(delay)
    attempts += 1
    result = await deliverWebhook(request.url, request.body, request.signature)
  }
  return { ...result, attempts }
}
