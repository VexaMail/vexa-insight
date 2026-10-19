import { EmptyState, Panel, StatusPill } from '@/components/ui'
import type { DnsHistoryPanelProps } from '@/types/domains'
import { formatUnixDateTime } from '@/utils/domains'
import { describeDnsRecordKind } from '@/utils/timeline'
import { History, X } from 'lucide-react'
import { DnsCheckNowButton } from './DnsCheckNowButton'

/** Every stored value of the tracked records, newest first. */
export function DnsHistoryPanel({
  domainId,
  entries,
}: Readonly<DnsHistoryPanelProps>) {
  return (
    <Panel
      flush
      icon={<History />}
      title="DNS change history"
      description="SPF, DMARC, MX, MTA-STS, TLS-RPT, BIMI and answering DKIM selectors, looked up daily. The first entry of each record is the baseline."
      actions={<DnsCheckNowButton domainId={domainId} />}
    >
      {entries.length === 0 ? (
        <div className="p-4">
          <EmptyState>
            No snapshot yet. The daily lookup has not run for this domain; check
            now to store a baseline.
          </EmptyState>
        </div>
      ) : (
        <ol className="divide-border divide-y">
          {entries.map((entry) => (
            <li key={entry.id} className="space-y-1.5 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-foreground text-sm font-medium">
                  {describeDnsRecordKind(entry.recordKind)}
                </span>
                <StatusPill
                  tone={entry.value === null ? 'danger' : 'info'}
                  icon={entry.value === null ? <X /> : null}
                >
                  {entry.value === null ? 'Removed' : 'Value'}
                </StatusPill>
                <span className="text-muted-foreground ml-auto font-mono text-xs">
                  {formatUnixDateTime(entry.observedAt)} · {entry.source}
                </span>
              </div>
              {entry.value ? (
                <code className="text-muted-foreground block font-mono text-xs break-all">
                  {entry.value}
                </code>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </Panel>
  )
}
