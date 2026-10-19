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
    <li className="flex items-start gap-3 px-4 py-3">
      <span className="bg-secondary text-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs">
        {position}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-foreground text-sm font-medium">{guide.title}</p>
          <p className="text-muted-foreground line-clamp-2 text-xs">
            {guide.summary.replaceAll('`', '')}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <FindingSeverityPill severity={guide.severity} />
          <Link
            href={href}
            className="text-primary hover:bg-primary/10 focus-visible:ring-ring inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none print:hidden"
          >
            View guide
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </li>
  )
}
