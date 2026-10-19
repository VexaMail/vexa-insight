import type { IpNetworkContext } from '@/types/ip-network'
import { checkForwardConfirmedRdns } from './checkForwardConfirmedRdns'
import { lookupAsn } from './lookupAsn'

/**
 * Live network facts about a sending address: forward-confirmed reverse DNS
 * and the announcing ASN. Both are DNS queries made when asked, never stored.
 */
export async function getIpNetworkContext(
  ip: string,
): Promise<IpNetworkContext> {
  const [rdns, asn] = await Promise.all([
    checkForwardConfirmedRdns(ip),
    lookupAsn(ip),
  ])
  return { ip, rdns, asn }
}
