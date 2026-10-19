import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { DecisionTileProps } from './DecisionTileProps'

/** One card of the decision row: icon, title, badge, chevron link, body. */
export function DecisionTile({
  icon,
  title,
  badge,
  href,
  children,
  className,
}: Readonly<DecisionTileProps>) {
  return (
    <section
      className={cn('glass-card flex min-w-0 flex-col gap-3 p-4', className)}
    >
      <header className="flex items-center gap-2">
        <span className="text-primary shrink-0 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
        <h2 className="text-foreground min-w-0 flex-1 text-sm leading-tight font-semibold">
          {title}
        </h2>
        {badge}
        {href ? (
          <Link
            href={href}
            aria-label={`Open ${title}`}
            className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring -mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  )
}
