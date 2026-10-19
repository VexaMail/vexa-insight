import { cn } from '@/lib/utils'
import type { StatTileProps } from '@/types/ui'
import Link from 'next/link'
import { StatTileBody } from './StatTileBody'
import { StatTileFeatureBody } from './StatTileFeatureBody'

/**
 * One number with its label and context. Every KPI strip uses it, so a value
 * always reads the same way: label, figure, then what the figure is out of.
 */
export function StatTile({
  href,
  className,
  variant = 'compact',
  ...body
}: Readonly<StatTileProps>) {
  const content =
    variant === 'feature' ? (
      <StatTileFeatureBody {...body} />
    ) : (
      <StatTileBody {...body} />
    )
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'glass-card-hover focus-visible:ring-ring block min-w-0 p-4 focus-visible:ring-2 focus-visible:outline-none',
          className,
        )}
      >
        {content}
      </Link>
    )
  }
  return (
    <div className={cn('glass-card min-w-0 p-4', className)}>{content}</div>
  )
}
