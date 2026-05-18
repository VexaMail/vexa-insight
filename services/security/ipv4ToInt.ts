/**
 * Convert a dotted-quad IPv4 string to an unsigned 32-bit integer.
 * Returns null if the input is not a valid IPv4 literal.
 */
export function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  let acc = 0
  for (const p of parts) {
    const n = Number(p)
    if (!Number.isInteger(n) || n < 0 || n > 255) return null
    acc = (acc * 256 + n) >>> 0
  }
  return acc
}
