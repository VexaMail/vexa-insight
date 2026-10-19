import { MAX_DOMAIN_MATCHES } from '@/constants/shell'
import type { CommandTarget } from '@/types/shell'
import { looksLikeDomainName } from './looksLikeDomainName'
import { looksLikeIpAddress } from './looksLikeIpAddress'

/**
 * Turns what the operator typed into the pages it can open: a source IP, a
 * report by internal id, a domain and its diagnostics, or any monitored domain
 * whose name contains the text.
 */
export function resolveCommandTargets(
  rawQuery: string,
  domains: readonly string[],
): CommandTarget[] {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return []
  const targets: CommandTarget[] = []

  if (looksLikeIpAddress(query)) {
    targets.push({
      label: query,
      hint: 'Sending source',
      href: `/ips/${encodeURIComponent(query)}`,
    })
  }
  if (/^\d+$/.test(query)) {
    targets.push({
      label: `Report #${query}`,
      hint: 'Aggregate report',
      href: `/reports/${query}`,
    })
  }

  const matches = domains
    .filter((name) => name.includes(query))
    .slice(0, MAX_DOMAIN_MATCHES)
  const exact = matches.includes(query)
  if (looksLikeDomainName(query) && !exact) {
    matches.unshift(query)
  }
  for (const name of matches) {
    targets.push({
      label: name,
      hint: 'Domain',
      href: `/domains/${encodeURIComponent(name)}`,
    })
  }
  if (matches[0]) {
    targets.push({
      label: matches[0],
      hint: 'Diagnostics',
      href: `/diagnostics/${encodeURIComponent(matches[0])}`,
    })
  }
  return targets
}
