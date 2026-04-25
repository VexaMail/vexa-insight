import { getSpfView } from '@/lib/diagnostics'

import { SectionCard } from './SectionCard'
import type { SpfCardProps } from './SpfCardProps'
import { StatusBadge } from './StatusBadge'

export function SpfCard({ data }: Readonly<SpfCardProps>) {
  const view = getSpfView(data)

  return (
    <SectionCard
      id="dns-spf"
      title="SPF"
      badge={<StatusBadge status={view.status} label={view.label} />}
    >
      {view.value ? (
        <pre className="bg-muted text-muted-foreground overflow-x-auto rounded px-3 py-2 text-xs">
          <code>{view.value}</code>
        </pre>
      ) : (
        <p className="text-muted-foreground text-sm">
          No SPF record found for this domain.
        </p>
      )}
      {view.warning && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          {view.warning}
        </p>
      )}
    </SectionCard>
  )
}
