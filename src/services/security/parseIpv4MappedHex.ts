/**
 * Parse the hex IPv4-mapped IPv6 form `::ffff:hhhh:hhhh` into a dotted IPv4
 * literal. Returns null when the input does not match that shape.
 *
 * Example: `::ffff:0a00:0001` -> `10.0.0.1`.
 */
export function parseIpv4MappedHex(lower: string): string | null {
  const match = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(lower)
  if (!match || !match[1] || !match[2]) return null
  const high = Number.parseInt(match[1], 16)
  const low = Number.parseInt(match[2], 16)
  if (!Number.isFinite(high) || !Number.isFinite(low)) return null
  const a = (high >> 8) & 0xff
  const b = high & 0xff
  const c = (low >> 8) & 0xff
  const d = low & 0xff
  return `${String(a)}.${String(b)}.${String(c)}.${String(d)}`
}
