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
        <TopBar />
        <main className="vexa-scrollbar flex-1 overflow-y-auto p-6 print:overflow-visible print:p-0">
          {children}
        </main>
      </div>
    </div>
  )
}
