import type { WebhookEvent } from '@/types/notifications'
import { log } from '@/utils/log'
import { dispatchWebhookEvent } from './dispatchWebhookEvent'

export function fireAndForgetDispatch(
  event: WebhookEvent,
  data: Record<string, unknown>,
): void {
  void (async () => {
    try {
      await dispatchWebhookEvent(event, data)
    } catch (err) {
      log.error('webhook.dispatch_failed', {
        event,
        err: err instanceof Error ? err.message : String(err),
      })
    }
  })()
}
