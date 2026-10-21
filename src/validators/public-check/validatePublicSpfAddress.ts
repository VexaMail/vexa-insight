import { isIP } from 'node:net'

export function validatePublicSpfAddress(term: string): string | null {
  const match = /^(ip4|ip6):([^/]+)(?:\/(\d+))?$/i.exec(term)
  if (!match) return `Malformed SPF address mechanism: ${term}.`
  const family = match[1]?.toLowerCase() === 'ip4' ? 4 : 6
  const maxPrefix = family === 4 ? 32 : 128
  if (
    isIP(match[2] ?? '') !== family ||
    Number(match[3] ?? maxPrefix) > maxPrefix
  )
    return `Invalid SPF address or prefix: ${term}.`
  return null
}
