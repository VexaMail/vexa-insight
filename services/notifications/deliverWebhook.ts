import { DISPATCH_TIMEOUT_MS } from './dispatchTimeoutMs'

export async function deliverWebhook(
  url: string,
  body: string,
  signature: string | null,
): Promise<{ status: number | null; error: string | null }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DISPATCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'vexa-mail-insight-webhook/1',
        ...(signature ? { 'x-vexa-signature': signature } : {}),
      },
      body,
      signal: controller.signal,
    })
    return { status: res.status, error: res.ok ? null : `HTTP ${res.status}` }
  } catch (err) {
    return {
      status: null,
      error: err instanceof Error ? err.message : 'Unknown dispatch error',
    }
  } finally {
    clearTimeout(timer)
  }
}
