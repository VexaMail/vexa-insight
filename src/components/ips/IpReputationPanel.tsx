'use client'

import { Panel } from '@/components/ui'
import { DNSBL_NOT_CHECKED, SOURCE_CAUSE_HINTS } from '@/constants/ips'
import { useIpNetworkContext } from '@/hooks/ips'
import type { IpReputationPanelProps } from '@/types/ips'
import {
  describeCauseSignal,
  describeFcrdns,
  describeStoredPtr,
} from '@/utils/ips'
import { Database, Info } from 'lucide-react'
import { IpLookUpButton } from './IpLookUpButton'
import { IpReputationRow } from './IpReputationRow'

/**
 * Context around the source: its PTR, forward-confirmed reverse DNS, blocklist
 * status and the classification heuristic. None of them decides legitimacy.
 */
export function IpReputationPanel({
  ip,
  hostname,
  cause,
}: Readonly<IpReputationPanelProps>) {
  const { context, loading, lookUp } = useIpNetworkContext(ip)
  return (
    <Panel
      title="Reputation & context"
      description="Signals for the investigation, not verdicts."
      icon={<Database />}
    >
      <dl className="divide-border -my-1.5 divide-y">
        <IpReputationRow
          label="PTR record"
          status={describeStoredPtr(hostname)}
        />
        <IpReputationRow
          label="FCrDNS matches"
          status={describeFcrdns(context?.rdns ?? null)}
          action={
            context ? undefined : (
              <IpLookUpButton loading={loading} onClick={lookUp} />
            )
          }
        />
        <IpReputationRow
          label="DNSBL status"
          status={DNSBL_NOT_CHECKED}
          title="Vexa does not query blocklists; use the blocklist lookup in external tools."
        />
        <IpReputationRow
          label="Classification (heuristic)"
          status={describeCauseSignal(cause)}
          title={SOURCE_CAUSE_HINTS[cause]}
        />
      </dl>
      <p className="border-border bg-secondary/40 text-muted-foreground mt-4 flex gap-2 rounded-md border p-3 text-xs">
        <Info
          className="text-info mt-0.5 h-4 w-4 shrink-0"
          aria-hidden="true"
        />
        These are context for the investigation only. They do not decide whether
        a sender is legitimate; record that in Operator review.
      </p>
    </Panel>
  )
}
