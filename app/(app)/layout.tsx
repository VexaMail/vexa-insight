import { AppShell } from '@/components/shell'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppShell>{children}</AppShell>
}
