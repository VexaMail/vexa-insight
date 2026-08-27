import { safeFetch } from '@/services/security'
import { DISPATCH_TIMEOUT_MS } from './dispatchTimeoutMs'

export async function deliverWebhook(
  url: string,
  body: string,
  signature: string | null,
): Promise<{ status: number | null; error: string | null }> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': 'vexa-mail-insight-webhook/1',
  }
  if (signature) headers['x-vexa-signature'] = signature
  const res = await safeFetch(url, {
    method: 'POST',
    headers,
    body,
    timeoutMs: DISPATCH_TIMEOUT_MS,
  })
  if (!res.ok) {
    return { status: null, error: `${res.error.code}: ${res.error.message}` }
  }
  return {
    status: res.status,
    error:
      res.status !== null && res.status >= 200 && res.status < 300
        ? null
        : `HTTP ${String(res.status)}`,
  }
}
