import { findingSeverityTones, protocolIcons } from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { diagnosticsSectionHref } from '@/utils/diagnostics'
import Link from 'next/link'
import type { FindingLinkProps } from '../findings/FindingLinkProps'
import { FindingSeverityIcon } from '../findings/FindingSeverityIcon'

/** A protocol's icon, state icon, state word and one fact; opens the evidence. */
export function ProtocolTile({ finding, base }: Readonly<FindingLinkProps>) {
  const tone = findingSeverityTones[finding.severity]
  const Icon = protocolIcons[finding.id]
  return (
    <li className="glass-card-hover relative flex min-w-0 flex-col p-3">
      <div className="mb-auto flex items-start justify-between gap-2 pb-3">
        <Icon aria-hidden strokeWidth={1.5} className="text-info h-7 w-7" />
        <span
          title={`${finding.state}. ${finding.detail}`}
          className="shrink-0 [&_svg]:h-5 [&_svg]:w-5"
        >
          <FindingSeverityIcon severity={finding.severity} />
        </span>
      </div>
      <span className="text-muted-foreground truncate font-mono text-[11px] font-medium uppercase">
        {finding.protocol}
      </span>
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
