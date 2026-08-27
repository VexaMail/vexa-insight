/**
 * Renders an unknown thrown value as a readable message.
 *
 * Plain `String(err)` is not enough here: the AI provider layer throws
 * `AIServiceError` object literals rather than `Error` instances, which
 * stringify to `[object Object]`. Serializing the whole object keeps the
 * upstream detail those carry in `providerMessage` — the part that actually
 * says what the API rejected.
 */
export function describeUnknownError(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null) return JSON.stringify(error)
  return String(error)
}
