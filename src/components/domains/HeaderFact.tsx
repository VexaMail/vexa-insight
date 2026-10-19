import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { HeaderFactProps } from './HeaderFactProps'

/** A small fact card beside the domain title: last report, total messages. */
export function HeaderFact({
  icon,
  label,
  value,
  title,
  href,
}: Readonly<HeaderFactProps>) {
  const body = (
    <>
      <span className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="text-muted-foreground block text-xs">{label}</span>
        <span className="text-foreground block font-mono text-lg font-semibold tabular-nums">
          {value}
        </span>
      </span>
      {href ? (
        <ChevronRight className="text-muted-foreground ml-auto h-4 w-4" />
      ) : null}
    </>
  )
  const className =
    'flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-4 lg:min-w-[11rem]'
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
