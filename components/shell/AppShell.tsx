import AppSidebar from './AppSidebar'

import TopBar from './TopBar'

export default function AppShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="vexa-scrollbar flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
