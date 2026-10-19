'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/shell'

export function renderNavItems(
  items: readonly NavItem[],
  pathname: string,
  onNavigate?: () => void,
) {
  return items.map((item) => {
    const isActive =
      item.url === '/'
        ? pathname === '/' || pathname.startsWith('/dashboard')
        : pathname.startsWith(item.url)

    return (
      <li key={item.title}>
        <Link
          href={item.url}
          {...(onNavigate ? { onClick: onNavigate } : {})}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            'group relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-medium transition-colors duration-150',
            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground ring-primary/25 ring-1 ring-inset'
              : 'text-sidebar-foreground hover:bg-accent hover:text-foreground',
          )}
          suppressHydrationWarning
        >
          {isActive ? (
            <span
              aria-hidden
              className="bg-primary absolute top-2 bottom-2 left-0 w-0.5 rounded-full shadow-[0_0_8px_hsl(var(--glow))]"
            />
          ) : null}
          <item.icon className="h-[18px] w-[18px] shrink-0" />
          <span suppressHydrationWarning>{item.title}</span>
        </Link>
      </li>
    )
  })
}
