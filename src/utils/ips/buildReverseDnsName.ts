import { expandIpv6 } from './expandIpv6'

/** The `in-addr.arpa` or `ip6.arpa` name a PTR lookup of `ip` queries. */
export function buildReverseDnsName(ip: string): string | null {
  if (ip.includes('.') && !ip.includes(':')) {
    return `${ip.split('.').reverse().join('.')}.in-addr.arpa`
  }
  const hex = expandIpv6(ip)
  return hex ? `${Array.from(hex).reverse().join('.')}.ip6.arpa` : null
}
