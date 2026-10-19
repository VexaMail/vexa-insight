'use client'

import { Panel } from '@/components/ui'
import { useIpNetworkContext } from '@/hooks/ips'
import type { IpNetworkPanelProps } from '@/types/ips'
import { Network } from 'lucide-react'
import { IpLookUpButton } from './IpLookUpButton'
import { IpNetworkFacts } from './IpNetworkFacts'

/** Live PTR check and ASN, looked up over public DNS only on request. */
export function IpNetworkPanel({ ip }: Readonly<IpNetworkPanelProps>) {
  const { context, loading, error, lookUp } = useIpNetworkContext(ip)
  return (
    <Panel
      icon={<Network />}
      title="Network"
      description="Forward-confirmed reverse DNS and the announcing network, looked up live over public DNS."
      actions={
        <IpLookUpButton
          loading={loading}
          onClick={lookUp}
          label={context ? 'Look up again' : 'Look up'}
        />
      }
    >
      {context ? (
        <IpNetworkFacts context={context} />
      ) : (
        <p className="text-muted-foreground text-sm">
          {error ??
            'Not looked up yet. The lookup sends this address to public DNS resolvers.'}
        </p>
      )}
    </Panel>
  )
}
