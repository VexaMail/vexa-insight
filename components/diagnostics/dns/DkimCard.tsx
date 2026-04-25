import { getDkimView } from '@/lib/diagnostics'

import type { DkimCardProps } from './DkimCardProps'
import { SectionCard } from './SectionCard'
import { StatusBadge } from './StatusBadge'

export function DkimCard({ data }: Readonly<DkimCardProps>) {
  const view = getDkimView(data)

  return (
    <SectionCard
      id="dns-dkim"
      title="DKIM"
      badge={<StatusBadge status={view.status} label={view.label} />}
    >
      {view.selectors.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {view.selectors.map((d) => {
            const selectorClass = d.valid
              ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'border-border text-muted-foreground bg-transparent'
            return (
              <span
                key={d.selector}
                title={d.record ?? undefined}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${selectorClass}`}
              >
                <span aria-hidden="true">{d.valid ? '✓' : '✗'}</span>
                {d.selector}
              </span>
            )
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No DKIM selectors were probed for this domain.
        </p>
      )}
      {view.status === 'error' && (
        <p className="text-muted-foreground text-xs">
          None of the probed selectors (
          {view.selectors.map((d) => d.selector).join(', ')}) returned a valid
          DKIM record.
        </p>
      )}
    </SectionCard>
  )
}
