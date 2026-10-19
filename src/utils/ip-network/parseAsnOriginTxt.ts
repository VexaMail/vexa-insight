import type { AsnInfo } from '@/types/ip-network'

/**
 * Parses `"64496 | 192.0.2.0/24 | US | arin | 2001-01-01"`. When an address is
 * announced by several ASNs the first field lists them space-separated; the
 * first one is kept. Null when the answer has no ASN.
 */
export function parseAsnOriginTxt(txt: string): AsnInfo | null {
  const [asnField = '', prefix, countryCode, registry] = txt
    .split('|')
    .map((field) => field.trim())
  const asn = Number.parseInt(asnField.split(/\s+/)[0] ?? '', 10)
  if (!Number.isFinite(asn) || asn <= 0) return null
  return {
    asn,
    prefix: prefix || null,
    countryCode: countryCode || null,
    registry: registry || null,
    name: null,
  }
}
