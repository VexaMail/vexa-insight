/**
 * Drops everything before the `?` of a pasted `http://localhost/?code=...`
 * address. Web application firewalls running the OWASP Core Rule Set block a
 * request parameter that names localhost as a possible SSRF (rule 934190),
 * so only the query string is sent to the server.
 */
export function toSndsRedirectQuery(pasted: string): string {
  const trimmed = pasted.trim()
  const index = trimmed.indexOf('?')
  return index === -1 ? trimmed : trimmed.slice(index + 1)
}
