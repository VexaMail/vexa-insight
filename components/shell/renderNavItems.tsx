'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/shell'

export function renderNavItems(items: readonly NavItem[], pathname: string) {
  return items.map((item) => {
    const isActive =
      item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)

    return (
      <li key={item.title}>
        <Link
          href={item.url}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
          suppressHydrationWarning
        >
          <item.icon className="h-4 w-4" />
          <span suppressHydrationWarning>{item.title}</span>
        </Link>
      </li>
    )
  })
}
