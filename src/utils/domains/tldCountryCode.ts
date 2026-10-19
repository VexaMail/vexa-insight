import { GENERIC_COUNTRY_TLDS } from '@/constants/domains'

/**
 * ISO country code of a domain's country-code TLD (`example.es` -> `ES`,
 * `.uk` -> `GB`), or null for generic TLDs and ccTLDs sold as generic names.
 */
export function tldCountryCode(domain: string): string | null {
  const tld = domain.trim().toLowerCase().split('.').pop() ?? ''
  if (!/^[a-z]{2}$/.test(tld) || GENERIC_COUNTRY_TLDS.has(tld)) return null
  return tld === 'uk' ? 'GB' : tld.toUpperCase()
}
