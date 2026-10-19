import type { IpMenuItem } from '@/types/ips'
import { buildReverseDnsName } from './buildReverseDnsName'

/**
 * Public lookups of an address in other tools: its registration over RDAP,
 * its PTR record over DNS-over-HTTPS and a multi-blocklist check. Each one
 * sends the address to that service, so they open only on a click.
 */
export function buildExternalLookupLinks(ip: string): IpMenuItem[] {
  const encoded = encodeURIComponent(ip)
  const arpa = buildReverseDnsName(ip)
  const links: IpMenuItem[] = [
    {
      key: 'rdap',
      kind: 'rdap',
      label: 'RDAP registration',
      href: `https://rdap.org/ip/${encoded}`,
      external: true,
    },
    {
      key: 'blocklist',
      kind: 'blocklist',
      label: 'Blocklist lookup',
      href: `https://multirbl.valli.org/lookup/${encoded}.html`,
      external: true,
    },
  ]
  if (arpa) {
    links.splice(1, 0, {
      key: 'rdns',
      kind: 'rdns',
      label: 'Reverse DNS lookup',
      href: `https://dns.google/resolve?name=${encodeURIComponent(arpa)}&type=PTR`,
      external: true,
    })
  }
  return links
}
