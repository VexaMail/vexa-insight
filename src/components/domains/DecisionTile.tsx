import { cn } from '@/lib/utils'
import type { DecisionTileProps } from './DecisionTileProps'

/** One tile of the decision row: icon, title, optional badge, body. */
export function DecisionTile({
  icon,
  title,
  badge,
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
      </header>
      {children}
    </section>
  )
}
