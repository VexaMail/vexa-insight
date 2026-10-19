import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ViewAllLinkProps } from './ViewAllLinkProps'

/** "View all ->" in a panel header. */
export function ViewAllLink({
  href,
  label = 'View all',
}: Readonly<ViewAllLinkProps>) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {label}
      <ArrowRight aria-hidden className="h-3 w-3" />
    </Link>
  )
}
