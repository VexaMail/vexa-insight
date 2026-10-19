'use client'

import { SidebarNav } from './SidebarNav'
import SidebarVersionStatus from './SidebarVersionStatus'
import VexaLogo from './VexaLogo'

export default function AppSidebar({
  projectName,
}: Readonly<{ projectName: string }>) {
  return (
    <aside className="border-sidebar-border bg-sidebar sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r lg:flex print:hidden">
      <div className="flex h-16 items-center px-3">
        <VexaLogo projectName={projectName} />
      </div>
      <div className="vexa-scrollbar flex-1 overflow-y-auto px-3 pt-4">
        <SidebarNav placement="main" />
      </div>
      <div className="border-sidebar-border shrink-0 border-t px-3 pt-3 pb-1">
        <SidebarNav placement="footer" />
      </div>
      <div className="border-sidebar-border shrink-0 border-t p-4">
        <SidebarVersionStatus />
      </div>
    </aside>
  )
}
