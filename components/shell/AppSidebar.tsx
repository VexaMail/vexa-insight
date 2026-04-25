'use client'

import { usePathname } from 'next/navigation'
import VexaLogo from './VexaLogo'
import { bottomNavItems } from './bottomNavItems'
import { renderNavItems } from './renderNavItems'
import { topNavItems } from './topNavItems'

export default function AppSidebar() {
  const pathname = usePathname()
  const collapsed = false

  return (
    <aside className="border-border/50 bg-sidebar sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r">
      <div className="border-border/50 flex h-14 items-center border-b px-3">
        <VexaLogo collapsed={collapsed} />
      </div>
      <nav className="vexa-scrollbar flex-1 overflow-y-auto px-2 pt-4">
        <ul className="space-y-1">{renderNavItems(topNavItems, pathname)}</ul>
      </nav>
      <div className="px-2 pb-4">
        <div className="border-border/50 my-2 border-t" />
        <ul className="space-y-1">
          {renderNavItems(bottomNavItems, pathname)}
        </ul>
      </div>
      <div className="border-border/50 shrink-0 border-t p-4 pb-6">
        <p className="text-muted-foreground/50 text-center text-[10px]">
          Vexa Insight v2.0
        </p>
      </div>
    </aside>
  )
}
