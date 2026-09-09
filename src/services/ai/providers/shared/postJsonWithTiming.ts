import type { TimedResponse } from '../../contracts'

/** POSTs a JSON body with a timeout and measures the round trip. */
export async function postJsonWithTiming(
  url: string,
  headers: Record<string, string>,
  body: unknown,
  timeoutMs: number,
): Promise<TimedResponse> {
  const start = Date.now()
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  })
  return { response, durationMs: Date.now() - start }
}
