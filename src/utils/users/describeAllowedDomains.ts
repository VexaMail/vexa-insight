import type { AllowedDomainsDisplay } from '@/types/users'

/**
 * The stored allowed-domains JSON as display text: "All Domains" when
 * unset or empty, the list when it parses, the raw value when it does not.
 */
export function describeAllowedDomains(
  allowedDomains: string | null,
): AllowedDomainsDisplay {
  if (!allowedDomains) return { text: 'All Domains', isAll: true }
  try {
    const domains: unknown = JSON.parse(allowedDomains)
    if (!Array.isArray(domains) || domains.length === 0) {
      return { text: 'All Domains', isAll: true }
    }
    return { text: domains.join(', '), isAll: false }
  } catch {
    return { text: allowedDomains, isAll: false }
  }
}
