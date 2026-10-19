import {
  findingSeverityTones,
  protocolTileToneClasses,
} from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { diagnosticsSectionHref } from '@/utils/diagnostics'
import Link from 'next/link'
import type { FindingLinkProps } from '../findings/FindingLinkProps'
import { FindingSeverityIcon } from '../findings/FindingSeverityIcon'
import { ProtocolTileInfo } from './ProtocolTileInfo'

/** A protocol's state word on a tile tinted by that state; opens the evidence. */
export function ProtocolTile({ finding, base }: Readonly<FindingLinkProps>) {
  const tone = findingSeverityTones[finding.severity]
  return (
    <li
      className={cn(
        'relative flex min-w-0 flex-col gap-1.5 rounded-xl border p-3 transition-colors duration-150',
        protocolTileToneClasses[tone],
      )}
    >
      <div className="mb-auto flex items-center justify-between gap-1.5 pb-2">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 [&_svg]:h-5 [&_svg]:w-5">
            <FindingSeverityIcon severity={finding.severity} />
          </span>
          <span className="text-muted-foreground truncate font-mono text-[11px] font-medium uppercase">
            {finding.protocol}
          </span>
        </span>
        <ProtocolTileInfo finding={finding} />
      </div>
      <Link
        href={diagnosticsSectionHref(base, finding.section)}
        className={cn(
          'focus-visible:ring-ring block truncate rounded text-lg font-semibold after:absolute after:inset-0 after:rounded-xl focus-visible:ring-2 focus-visible:outline-none',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {finding.tileValue}
        <span className="sr-only">: {finding.protocol} details</span>
      </Link>
      <p className="text-muted-foreground line-clamp-2 text-xs">
        {finding.tileHint}
      </p>
    </li>
  )
}
