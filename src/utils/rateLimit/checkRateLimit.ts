import { store } from './store'

/**
 * Returns true if the request is allowed, false if rate limit exceeded.
 * Caller should return 429 when false.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry) {
    store.set(key, { count: 1, windowStartMs: now })
    return true
  }
  if (now - entry.windowStartMs >= windowMs) {
    store.set(key, { count: 1, windowStartMs: now })
    return true
  }
  if (entry.count >= limit) {
    return false
  }
  entry.count += 1
  return true
}
