import { cn } from '@/lib/utils'
import type { TabNavProps } from '@/types/ui'
import Link from 'next/link'

/**
 * Tabs as links: each tab is its own URL (`?tab=`), so a section can be shared,
 * bookmarked and opened from a cross-link, and the page stays server-rendered.
 */
export function TabNav({ items, active, label }: Readonly<TabNavProps>) {
  return (
    <nav
      aria-label={label}
      className="border-border -mx-1 overflow-x-auto border-b"
    >
      <ul className="flex min-w-max gap-1 px-1">
        {items.map((item) => {
          const isActive = item.key === active
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                scroll={false}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium transition-colors duration-150',
                  'focus-visible:ring-ring rounded-t-md focus-visible:ring-2 focus-visible:outline-none',
                  isActive
                    ? 'text-foreground after:bg-primary after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.icon ? (
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                ) : null}
                {item.label}
                {item.count === undefined ? null : (
                  <span className="bg-secondary text-muted-foreground rounded px-1.5 font-mono text-[11px] tabular-nums">
                    {item.count}
                  </span>
                )}
                {item.badge ? (
                  <span className="bg-danger/15 text-danger rounded px-1.5 text-[10px] font-semibold tracking-wide uppercase">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
