import { cn } from '@/lib/utils'
import type { StatTileProps } from '@/types/ui'
import Link from 'next/link'
import { StatTileBody } from './StatTileBody'

/**
 * One number with its label and context. Every KPI strip uses it, so a value
 * always reads the same way: label, figure, then what the figure is out of.
 */
export function StatTile({
  href,
  className,
  ...body
}: Readonly<StatTileProps>) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'glass-card-hover focus-visible:ring-ring block min-w-0 p-4 focus-visible:ring-2 focus-visible:outline-none',
          className,
        )}
      >
        <StatTileBody {...body} />
      </Link>
    )
  }
  return (
    <div className={cn('glass-card min-w-0 p-4', className)}>
      <StatTileBody {...body} />
    </div>
  )
}
