import { Breadcrumbs } from '@/components/ui'
import AppSidebar from './AppSidebar'

import TopBar from './TopBar'

export default function AppShell({
  children,
  projectName,
}: Readonly<{ children: React.ReactNode; projectName: string }>) {
  return (
    <div className="flex h-screen w-full overflow-hidden print:block print:h-auto print:overflow-visible">
      <AppSidebar projectName={projectName} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden print:block print:overflow-visible">
        <TopBar projectName={projectName} />
        <main className="vexa-scrollbar console-canvas flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 print:overflow-visible print:bg-none print:p-0">
          <div className="mx-auto mb-3 w-full max-w-7xl empty:hidden print:hidden">
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
