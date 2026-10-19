'use client'

import { navGroups } from '@/constants/shell'
import type { SidebarNavProps } from '@/types/shell'
import { usePathname } from 'next/navigation'
import { renderNavItems } from './renderNavItems'

/** The grouped navigation, shared by the desktop sidebar and the phone drawer. */
export function SidebarNav({ onNavigate }: Readonly<SidebarNavProps>) {
  const pathname = usePathname()
  return (
    <nav aria-label="Main" className="space-y-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="text-muted-foreground/70 mb-1.5 px-3 font-mono text-[11px] font-medium tracking-[0.14em] uppercase">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {renderNavItems(group.items, pathname, onNavigate)}
          </ul>
        </div>
      ))}
    </nav>
  )
}
