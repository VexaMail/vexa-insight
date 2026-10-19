import { isIPv4, isIPv6 } from 'node:net'

/**
 * The address as reversed DNS labels: octets for IPv4 (`2.0.192` order), and
 * nibbles of the fully expanded address for IPv6. Null for anything else.
 */
export function reverseIpLabels(ip: string): string | null {
  if (isIPv4(ip)) return ip.split('.').reverse().join('.')
  if (!isIPv6(ip)) return null
  const [head = '', tail = ''] = ip.split('::')
  const headGroups = head ? head.split(':') : []
  const tailGroups = ip.includes('::') && tail ? tail.split(':') : []
  const missing = 8 - headGroups.length - tailGroups.length
  const groups = ip.includes('::')
    ? [...headGroups, ...Array<string>(missing).fill('0'), ...tailGroups]
    : headGroups
  return groups
    .map((group) => group.padStart(4, '0'))
    .join('')
    .split('')
    .reverse()
    .join('.')
}
