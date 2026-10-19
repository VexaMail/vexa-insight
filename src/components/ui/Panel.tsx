import { cn } from '@/lib/utils'
import type { PanelProps } from '@/types/ui'

/** The console's one card: optional header row, then content. */
export function Panel({
  title,
  description,
  icon,
  actions,
  children,
  className,
  flush = false,
}: Readonly<PanelProps>) {
  const hasHeader = title !== undefined || actions !== undefined
  return (
    <section className={cn('glass-card flex min-w-0 flex-col', className)}>
      {hasHeader ? (
        <header className="border-border flex items-start justify-between gap-3 border-b px-4 py-3">
          <div className="flex min-w-0 items-start gap-2.5">
            {icon ? (
              <span className="text-primary mt-0.5 shrink-0 [&_svg]:h-4 [&_svg]:w-4">
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              {title ? (
                <h2 className="text-foreground text-sm font-semibold">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </header>
      ) : null}
      <div className={cn('min-w-0 flex-1', flush ? '' : 'p-4')}>{children}</div>
    </section>
  )
}
