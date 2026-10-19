import { findingSeverityTones } from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { FindingProps } from './FindingProps'

/** Observed state, the fact behind it, and the record as published. */
export function FindingState({ finding }: Readonly<FindingProps>) {
  return (
    <div className="min-w-0 space-y-1">
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
  )
}
