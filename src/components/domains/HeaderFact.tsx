import { IconTile } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { HeaderFactProps } from './HeaderFactProps'

/** A fact card beside the domain title, e.g. when the last report came in. */
export function HeaderFact({
  icon,
  label,
  value,
  hint,
  title,
  href,
}: Readonly<HeaderFactProps>) {
  const body = (
    <>
      <IconTile>{icon}</IconTile>
      <span className="min-w-0 flex-1">
        <span className="text-muted-foreground block truncate text-sm">
          {label}
        </span>
        <span className="text-foreground mt-1 block text-xl leading-none font-semibold tracking-tight">
          {value}
        </span>
        {hint ? (
          <span className="text-muted-foreground mt-2 block truncate text-xs">
            {hint}
          </span>
        ) : null}
      </span>
      {href ? (
        <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
      ) : null}
    </>
  )
  const className = 'flex min-w-0 items-center gap-3.5 p-4 lg:w-60'
  if (!href) {
    return (
      <div className={cn('glass-card', className)} title={title}>
        {body}
      </div>
    )
  }
  return (
    <Link
      href={href}
      title={title}
      className={cn(
        'glass-card-hover focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        className,
      )}
    >
      {body}
    </Link>
  )
}
