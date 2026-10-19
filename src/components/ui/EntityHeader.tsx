import { cn } from '@/lib/utils'
import type { EntityHeaderProps } from '@/types/ui'

/**
 * The top of every detail page: what it is, its identifier with a copy
 * control, its state, and the actions that act on it.
 */
export function EntityHeader({
  kind,
  title,
  mono = false,
  leading,
  titleAddon,
  chips,
  actions,
}: Readonly<EntityHeaderProps>) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 space-y-2">
        <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
          {kind}
        </p>
        <div className="flex min-w-0 items-center gap-2.5">
          {leading}
          <h1
            className={cn(
              'text-foreground min-w-0 text-2xl font-semibold tracking-tight break-all sm:text-3xl',
              mono && 'font-mono tracking-normal',
            )}
          >
            {title}
          </h1>
          {titleAddon}
        </div>
        {chips ? (
          <div className="flex flex-wrap items-center gap-2">{chips}</div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  )
}
