import { AppShell } from '@/components/shell'
import { requirePageSession } from '@/services/auth'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await requirePageSession()
  return <AppShell>{children}</AppShell>
}
