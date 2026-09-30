/**
 * Reads the authorization code out of what the admin pasted: the whole
 * `http://localhost/?code=...` address, its query string, or the bare code.
 * An `error` in the redirect is surfaced as such.
 */
export function extractSndsAuthCode(
  input: string,
): { code: string } | { error: string } {
  const trimmed = input.trim()
  if (trimmed === '')
    return { error: 'Paste the address the browser ended on.' }
  const query = trimmed.includes('?')
    ? trimmed.slice(trimmed.indexOf('?') + 1)
    : trimmed
  if (query.includes('=')) {
    const params = new URLSearchParams(query)
    const code = params.get('code')
    if (code) return { code }
    const error = params.get('error_description') ?? params.get('error')
    return { error: error ?? 'No authorization code in the pasted address.' }
  }
  return { code: trimmed }
}
