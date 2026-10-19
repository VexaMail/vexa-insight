import { findingSeverityTones } from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { FindingProps } from './FindingProps'
import { FindingSeverityIcon } from './FindingSeverityIcon'

/** State icon, observed state, the fact behind it and the record as published. */
export function FindingState({ finding }: Readonly<FindingProps>) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 shrink-0 [&_svg]:h-5 [&_svg]:w-5">
        <FindingSeverityIcon severity={finding.severity} />
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <p
          className={cn(
            'text-sm font-medium',
            STATUS_TONE_TEXT_CLASSES[findingSeverityTones[finding.severity]],
          )}
        >
          {finding.state}
        </p>
        <p className="text-muted-foreground text-xs">{finding.detail}</p>
        {finding.observed === null ? null : (
          <code
            title={finding.observed}
            className="bg-muted/60 text-muted-foreground block max-w-full truncate rounded px-1.5 py-0.5 font-mono text-[11px]"
          >
            {finding.observed}
          </code>
        )}
      </div>
    </div>
  )
}
