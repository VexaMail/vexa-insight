import { safeFetch } from '@/services/security'
import type { WebhookDeliveryResult } from '@/types/notifications'
import {
  isRetryableFetchError,
  isRetryableWebhookStatus,
} from '@/utils/notifications'
import { DISPATCH_TIMEOUT_MS } from './dispatchTimeoutMs'

export async function deliverWebhook(
  url: string,
  body: string,
  signature: string | null,
): Promise<WebhookDeliveryResult> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': 'vexa-insight-webhook/1',
  }
  if (signature) headers['x-vexa-signature'] = signature
  const res = await safeFetch(url, {
    method: 'POST',
    headers,
    body,
    timeoutMs: DISPATCH_TIMEOUT_MS,
  })
  if (!res.ok) {
    return {
      status: null,
      error: `${res.error.code}: ${res.error.message}`,
      retryable: isRetryableFetchError(res.error.code),
    }
  }
  const ok = res.status !== null && res.status >= 200 && res.status < 300
  return {
    status: res.status,
    error: ok ? null : `HTTP ${String(res.status)}`,
    retryable:
      !ok && res.status !== null && isRetryableWebhookStatus(res.status),
  }
}
