'use client'

import { SidebarNav } from './SidebarNav'
import SidebarVersionStatus from './SidebarVersionStatus'
import VexaLogo from './VexaLogo'

export default function AppSidebar({
  projectName,
}: Readonly<{ projectName: string }>) {
  return (
    <aside className="border-sidebar-border bg-sidebar sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r lg:flex print:hidden">
      <div className="border-sidebar-border flex h-14 items-center border-b px-3">
        <VexaLogo projectName={projectName} />
      </div>
      <div className="vexa-scrollbar flex-1 overflow-y-auto px-2 pt-5">
        <SidebarNav />
      </div>
      <div className="border-sidebar-border shrink-0 border-t p-4">
        <SidebarVersionStatus />
      </div>
    </aside>
  )
}
