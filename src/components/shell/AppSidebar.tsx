'use client'

import { usePathname } from 'next/navigation'
import { bottomNavItems } from './bottomNavItems'
import { renderNavItems } from './renderNavItems'
import SidebarVersionStatus from './SidebarVersionStatus'
import { topNavItems } from './topNavItems'
import VexaLogo from './VexaLogo'

export default function AppSidebar({
  projectName,
}: Readonly<{ projectName: string }>) {
  const pathname = usePathname()
  const collapsed = false

  return (
    <aside className="border-border/50 bg-sidebar sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r print:hidden">
      <div className="border-border/50 flex h-14 items-center border-b px-3">
        <VexaLogo collapsed={collapsed} projectName={projectName} />
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
        <SidebarVersionStatus />
      </div>
    </aside>
  )
}
