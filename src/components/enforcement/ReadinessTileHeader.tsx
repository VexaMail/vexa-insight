import { StatusPill } from '@/components/ui'
import { cn } from '@/lib/utils'
import { verdictPillVariant } from '@/utils/ui'
import { ChevronRight, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import type { ReadinessTileHeaderProps } from './ReadinessTileHeaderProps'

/** Title row of the readiness card: icon, title, verdict and chevron link. */
export function ReadinessTileHeader({
  tone,
  label,
  atRisk,
  reviewHref,
}: Readonly<ReadinessTileHeaderProps>) {
  return (
    <header className="flex items-center gap-2">
      <TriangleAlert
        className={cn(
          'h-4 w-4 shrink-0',
          atRisk ? 'text-danger' : 'text-primary',
        )}
        aria-hidden
      />
      <h2 className="text-foreground min-w-0 flex-1 text-sm leading-tight font-semibold">
        Enforcement readiness
      </h2>
      <StatusPill tone={tone} variant={verdictPillVariant(tone)}>
        {label}
      </StatusPill>
      <Link
        href={reviewHref}
        aria-label="Open the senders at risk"
        className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring -mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </header>
  )
}
