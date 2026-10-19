import { cn } from '@/lib/utils'
import type { TileLinkButtonProps } from '@/types/domains'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/** The action at the foot of a card: an outlined or a filled link button. */
export function TileLinkButton({
  href,
  children,
  variant = 'outline',
  className,
}: Readonly<TileLinkButtonProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'focus-visible:ring-ring inline-flex min-h-9 w-fit items-center gap-2 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
        variant === 'info'
          ? 'bg-info text-info-foreground hover:bg-info/90'
          : 'border-info/50 text-info hover:bg-info/10 border',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}
