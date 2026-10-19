/** The 32 hex digits of an IPv6 address, `::` expanded; null when invalid. */
export function expandIpv6(ip: string): string | null {
  const halves = ip.toLowerCase().split('::')
  if (halves.length > 2) return null
  const head = halves[0] ? halves[0].split(':') : []
  const tail = halves[1] ? halves[1].split(':') : []
  const missing = 8 - head.length - tail.length
  if (missing < 0 || (halves.length === 1 && missing !== 0)) return null
  const groups = [
    ...head,
    ...Array.from({ length: missing }, () => '0'),
    ...tail,
  ]
  if (groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null
  return groups.map((group) => group.padStart(4, '0')).join('')
}
