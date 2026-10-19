import type { AsnInfo } from '@/types/ip-network'

/** `AS64496`, or Unknown when the lookup found no announcement. */
export function formatAsn(asn: AsnInfo | null): string {
  return asn ? `AS${String(asn.asn)}` : 'Unknown'
}
