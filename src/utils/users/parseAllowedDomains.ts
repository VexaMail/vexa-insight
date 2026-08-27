/**
 * Parses the users.allowed_domains column, a JSON-encoded array of domain
 * names. Malformed JSON, non-arrays and non-string entries yield an empty
 * list, which callers already treat as "no restriction recorded".
 */
export function parseAllowedDomains(allowedDomains: string): string[] {
  try {
    const parsed: unknown = JSON.parse(allowedDomains)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((entry): entry is string => typeof entry === 'string')
  } catch {
    return []
  }
}
