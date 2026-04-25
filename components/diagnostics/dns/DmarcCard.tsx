import { getDmarcView } from '@/lib/diagnostics'

import type { DmarcCardProps } from './DmarcCardProps'
import { SectionCard } from './SectionCard'
import { StatusBadge } from './StatusBadge'

export function DmarcCard({ data }: Readonly<DmarcCardProps>) {
  const view = getDmarcView(data)

  return (
    <SectionCard
      id="dns-dmarc"
      title="DMARC"
      badge={<StatusBadge status={view.status} label={view.label} />}
    >
      {view.value ? (
        <>
          <pre className="bg-muted text-muted-foreground overflow-x-auto rounded px-3 py-2 text-xs">
            <code>{view.value}</code>
          </pre>
          <div className="text-muted-foreground flex flex-wrap gap-3 text-xs">
            {view.policy && (
              <span>
                Policy:{' '}
                <span className="text-foreground font-medium">
                  {view.policy}
                </span>
              </span>
            )}
            <span>
              Reporting:{' '}
              <span className="text-foreground font-medium">
                {view.reportingEnabled ? 'enabled' : 'disabled'}
              </span>
            </span>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-sm">
          No DMARC record found for this domain.
        </p>
      )}
      {view.policy === 'none' && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Policy is set to <code className="font-mono font-semibold">none</code>
          . Emails will not be quarantined or rejected on DMARC failure.
        </p>
      )}
    </SectionCard>
  )
}
