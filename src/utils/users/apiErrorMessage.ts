/** The `error.message` string of an API error body, else the fallback. */
export function apiErrorMessage(body: unknown, fallback: string): string {
  return typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'object' &&
    body.error !== null &&
    'message' in body.error &&
    typeof body.error.message === 'string'
    ? body.error.message
    : fallback
}
