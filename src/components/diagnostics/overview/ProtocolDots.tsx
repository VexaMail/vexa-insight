import { findingSeverityTones } from '@/constants/diagnostics'
import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { sortFindingsByProtocol } from '@/utils/diagnostics'
import type { ProtocolDotsProps } from './ProtocolDotsProps'

/** One labelled dot per protocol, coloured by the state of its check. */
export function ProtocolDots({ findings }: Readonly<ProtocolDotsProps>) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {sortFindingsByProtocol(findings).map((finding) => (
        <li
          key={finding.id}
          title={`${finding.protocol}: ${finding.state}`}
          className="flex items-center gap-1"
        >
          <span
            aria-hidden
            className={cn(
              'h-2 w-2 rounded-full',
              STATUS_TONE_DOT_CLASSES[findingSeverityTones[finding.severity]],
            )}
          />
          <span className="text-muted-foreground font-mono text-[11px]">
            {finding.protocol}
          </span>
          <span className="sr-only">: {finding.tileValue}</span>
        </li>
      ))}
    </ul>
  )
}
