import dns from 'node:dns/promises'
import net from 'node:net'

/**
 * Resolve a hostname (or IP literal) to one or more IP address strings.
 * For IPv6 literals wrapped in brackets, the brackets are stripped before
 * lookup. Throws if DNS resolution fails — the caller maps that to a typed
 * SafeFetchError.
 */
export async function resolveHostAddresses(host: string): Promise<string[]> {
  const stripped = host.replace(/^\[|\]$/g, '')
  if (net.isIP(stripped) !== 0) return [stripped]
  const lookups = await dns.lookup(host, { all: true, verbatim: true })
  return lookups.map((l) => l.address)
}
