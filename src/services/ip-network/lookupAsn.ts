import { ASN_LOOKUP_ZONES } from '@/constants/ip-network'
import type { AsnInfo } from '@/types/ip-network'
import {
  parseAsnNameTxt,
  parseAsnOriginTxt,
  reverseIpLabels,
} from '@/utils/ip-network'
import { isIPv4 } from 'node:net'
import { resolveTxtFirst } from './resolveTxtFirst'

/** The ASN announcing an address and its holder name, or null. */
export async function lookupAsn(ip: string): Promise<AsnInfo | null> {
  const labels = reverseIpLabels(ip)
  if (!labels) return null
  const zone = isIPv4(ip) ? ASN_LOOKUP_ZONES.origin4 : ASN_LOOKUP_ZONES.origin6
  const origin = await resolveTxtFirst(`${labels}.${zone}`)
  const info = origin ? parseAsnOriginTxt(origin) : null
  if (!info) return null
  const names = await resolveTxtFirst(
    `AS${String(info.asn)}.${ASN_LOOKUP_ZONES.names}`,
  )
  return { ...info, name: names ? parseAsnNameTxt(names) : null }
}
