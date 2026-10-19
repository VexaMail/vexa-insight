'use client'

import { useIpNetworkContext } from '@/hooks/ips'
import type { IpNetworkInfoRowsProps } from '@/types/ips'
import { describeRdnsStatus, formatAsn } from '@/utils/ips'
import { IpInfoRow } from './IpInfoRow'
import { IpLookUpButton } from './IpLookUpButton'

/**
 * Forward-confirmed reverse DNS, ASN and organisation of the source, looked
 * up live only when the operator asks: the lookup sends the address to
 * public DNS resolvers.
 */
export function IpNetworkInfoRows({ ip }: Readonly<IpNetworkInfoRowsProps>) {
  const { context, loading, error, lookUp } = useIpNetworkContext(ip)
  if (!context) {
    return (
      <IpInfoRow label="ASN and organization">
        {error ? <span className="text-danger text-xs">{error}</span> : null}
        <IpLookUpButton loading={loading} onClick={lookUp} />
      </IpInfoRow>
    )
  }
  const { rdns, asn } = context
  return (
    <>
      <IpInfoRow label="Reverse DNS">
        <span
          className={
            rdns.status === 'confirmed'
              ? 'text-success truncate'
              : 'text-warning truncate'
          }
        >
          {describeRdnsStatus(rdns)}
        </span>
      </IpInfoRow>
      <IpInfoRow label="ASN">
        <span className="font-mono">{formatAsn(asn)}</span>
      </IpInfoRow>
      <IpInfoRow label="Organization">
        <span className="truncate">{asn?.name ?? 'Unknown'}</span>
      </IpInfoRow>
    </>
  )
}
