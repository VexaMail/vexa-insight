import { protocolFullNames, protocolIcons } from '@/constants/diagnostics'
import type { FindingProps } from './FindingProps'

/** Protocol icon, what was checked and what the acronym stands for. */
export function FindingCheckCell({ finding }: Readonly<FindingProps>) {
  const Icon = protocolIcons[finding.id]
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon
        aria-hidden
        strokeWidth={1.5}
        className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0"
      />
      <div className="min-w-0">
        <p className="text-foreground text-sm font-medium">{finding.check}</p>
        <p className="text-muted-foreground text-xs">
          {protocolFullNames[finding.id]}
        </p>
      </div>
    </div>
  )
}
