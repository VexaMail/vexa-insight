'use client'

import { useIpNetworkContext } from '@/hooks/ips'
import type { IpNetworkInfoRowsProps } from '@/types/ips'
import { formatAsn } from '@/utils/ips'
import { Building2, Network } from 'lucide-react'
import { IpHeaderChip } from './IpHeaderChip'

/** ASN and organisation chips, shown once the network lookup has answered. */
export function IpNetworkChips({ ip }: Readonly<IpNetworkInfoRowsProps>) {
  const { context } = useIpNetworkContext(ip)
  if (!context?.asn) return null
  return (
    <>
      <IpHeaderChip icon={<Network />} title="Announcing network">
        {formatAsn(context.asn)}
      </IpHeaderChip>
      {context.asn.name ? (
        <IpHeaderChip icon={<Building2 />} title="Organization">
          {context.asn.name}
        </IpHeaderChip>
      ) : null}
    </>
  )
}
