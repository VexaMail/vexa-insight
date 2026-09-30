import { isIP } from 'node:net'

/**
 * The address of a `Source-IP` field, which senders often follow with the
 * host in parentheses (`192.0.2.10 (mail.example.com)`); null when the
 * first token is not an IP address.
 */
export function readSourceIp(value: string | null): string | null {
  const token = value
    ?.trim()
    .split(/\s+/)[0]
    ?.replace(/^\[|\]$/g, '')
  if (token === undefined || isIP(token) === 0) return null
  return token
}
