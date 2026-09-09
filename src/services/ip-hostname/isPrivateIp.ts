import { isRfc1918Range } from './isRfc1918Range'

/**
 * Determines whether an IPv4 address belongs to a private or local range.
 */
export function isPrivateIp(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false

  const [firstPart, secondPart] = parts.map(Number)

  return (
    isRfc1918Range(firstPart, secondPart) ||
    firstPart === 127 ||
    (firstPart === 169 && secondPart === 254)
  )
}
