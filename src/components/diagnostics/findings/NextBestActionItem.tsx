import { findingSeverityTones } from '@/constants/diagnostics'
import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FindingSeverityPill } from './FindingSeverityPill'
import type { NextBestActionItemProps } from './NextBestActionItemProps'

export function NextBestActionItem({
  guide,
  position,
  href,
}: Readonly<NextBestActionItemProps>) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span
        className={cn(
          'text-background flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold',
          STATUS_TONE_DOT_CLASSES[findingSeverityTones[guide.severity]],
        )}
      >
        {position}
      </span>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-foreground text-sm font-medium">{guide.title}</p>
        <p className="text-muted-foreground line-clamp-2 text-xs">
          {guide.summary.replaceAll('`', '')}
        </p>
      </div>
      <FindingSeverityPill severity={guide.severity} />
      <Link
        href={href}
        aria-label={`View guide: ${guide.title}`}
        className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none print:hidden"
      >
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </li>
  )
}
