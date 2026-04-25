export async function withDiagnosticsCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  const cache =
    (
      globalThis as typeof globalThis & {
        __vexaDiagnosticsCache?: Map<string, { expiresAt: number; value: T }>
      }
    ).__vexaDiagnosticsCache ??
    new Map<string, { expiresAt: number; value: T }>()

  ;(
    globalThis as typeof globalThis & {
      __vexaDiagnosticsCache?: Map<string, { expiresAt: number; value: T }>
    }
  ).__vexaDiagnosticsCache = cache

  const cached = cache.get(key)
  const now = Date.now()

  if (cached && cached.expiresAt > now) {
    return cached.value
  }

  const value = await loader()
  cache.set(key, { expiresAt: now + ttlMs, value })

  return value
}
