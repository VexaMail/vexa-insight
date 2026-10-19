'use client'

import { CopyIconButton } from '@/components/ui'
import { useIpNetworkContext } from '@/hooks/ips'
import type { IpNetworkInfoRowsProps } from '@/types/ips'
import { IpAsnInfoRows } from './IpAsnInfoRows'
import { IpInfoRow } from './IpInfoRow'
import { IpLookUpButton } from './IpLookUpButton'

/**
 * PTR, ASN and organisation of the source from the live lookup, which runs
 * only when the operator asks: it sends the address to public resolvers.
 */
export function IpNetworkInfoRows({ ip }: Readonly<IpNetworkInfoRowsProps>) {
  const { context, loading, error, lookUp } = useIpNetworkContext(ip)
  const ptr = context?.rdns.ptrNames[0] ?? null
  return (
    <>
      <IpInfoRow label="Reverse DNS (PTR)">
        {context ? (
          <span className="truncate font-mono">{ptr ?? 'None'}</span>
        ) : (
          <IpLookUpButton loading={loading} onClick={lookUp} />
        )}
        {ptr ? <CopyIconButton value={ptr} label="PTR name" /> : null}
      </IpInfoRow>
      <IpAsnInfoRows context={context} error={error} />
    </>
  )
}
