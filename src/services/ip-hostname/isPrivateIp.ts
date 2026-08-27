/**
 * Determines whether an IPv4 address belongs to a private or local range.
 */
export function isPrivateIp(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false

  const [firstPart, secondPart] = parts.map(Number)

  return (
    firstPart === 10 ||
    (firstPart === 172 &&
      secondPart !== undefined &&
      secondPart >= 16 &&
      secondPart <= 31) ||
    (firstPart === 192 && secondPart === 168) ||
    firstPart === 127 ||
    (firstPart === 169 && secondPart === 254)
  )
}
