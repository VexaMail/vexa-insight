'use client'

import { navGroups } from '@/constants/shell'
import type { SidebarNavProps } from '@/types/shell'
import { usePathname } from 'next/navigation'
import { renderNavItems } from './renderNavItems'

/** The navigation, shared by the desktop sidebar and the phone drawer. */
export function SidebarNav({
  onNavigate,
  placement = 'all',
}: Readonly<SidebarNavProps>) {
  const pathname = usePathname()
  const groups = navGroups.filter(
    (group) => placement === 'all' || group.placement === placement,
  )
  return (
    <nav
      aria-label={placement === 'footer' ? 'Admin' : 'Main'}
      className="space-y-4"
    >
      {groups.map((group) => (
        <div
          key={group.label}
          className={
            placement === 'all' && group.placement === 'footer'
              ? 'border-sidebar-border border-t pt-4'
              : undefined
          }
        >
          <p className="sr-only">{group.label}</p>
          <ul className="space-y-1">
            {renderNavItems(group.items, pathname, onNavigate)}
          </ul>
        </div>
      ))}
    </nav>
  )
}
