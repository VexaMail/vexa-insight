/**
 * Normalizes a raw IP string for storage and lookup: trims whitespace and
 * strips the `[...]` brackets IMAP/SMTP sometimes wraps IPv6 literals in.
 * Returns an empty string for input that normalizes to nothing.
 */
export function normalizeIp(ipStr: string): string {
  return ipStr.trim().replace(/^\[|\]$/g, '')
}
