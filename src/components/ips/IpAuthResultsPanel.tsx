import { Panel } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { formatMessageCount } from '@/utils/ips'
import { ShieldCheck } from 'lucide-react'
import { IpAuthCheckRow } from './IpAuthCheckRow'

/** SPF auth, SPF aligned, DKIM auth, DKIM aligned and DMARC, kept apart. */
export function IpAuthResultsPanel({ ctx }: Readonly<IpDetailContextProps>) {
  return (
    <Panel
      title="Authentication results"
      description={`Share of ${formatMessageCount(ctx.data.totalMessages)} in the window`}
      icon={<ShieldCheck />}
    >
      <ul className="divide-border divide-y">
        {ctx.checks.map((check) => (
          <IpAuthCheckRow
            key={check.key}
            check={check}
            total={ctx.data.totalMessages}
          />
        ))}
      </ul>
    </Panel>
  )
}
