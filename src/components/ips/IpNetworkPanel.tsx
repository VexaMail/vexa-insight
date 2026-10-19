'use client'

import { Panel } from '@/components/ui'
import { useIpNetworkContext } from '@/hooks/ips'
import type { IpNetworkPanelProps } from '@/types/ips'
import { Network } from 'lucide-react'
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
        <button
          type="button"
          onClick={lookUp}
          disabled={loading}
          className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-9 items-center rounded-md border px-3 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
        >
          {loading ? 'Looking up' : context ? 'Look up again' : 'Look up'}
        </button>
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
