import { getMxView } from '@/lib/diagnostics'

import type { MxCardProps } from './MxCardProps'
import { SectionCard } from './SectionCard'
import { StatusBadge } from './StatusBadge'

export function MxCard({ data }: Readonly<MxCardProps>) {
  const view = getMxView(data)

  return (
    <SectionCard
      id="dns-mx"
      title="MX Records"
      badge={<StatusBadge status={view.status} label={view.label} />}
    >
      {view.records.length > 0 ? (
        <ul className="space-y-1">
          {view.records.map((mx) => (
            <li
              key={mx.exchange}
              className="text-muted-foreground flex items-center gap-2 text-xs"
            >
              <span className="bg-muted w-8 rounded px-1 py-0.5 text-center font-mono font-medium">
                {mx.priority}
              </span>
              <span className="text-foreground">{mx.exchange}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">
          No MX records found for this domain.
        </p>
      )}
    </SectionCard>
  )
}
