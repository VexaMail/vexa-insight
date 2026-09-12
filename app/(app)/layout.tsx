import { AppShell } from '@/components/shell'
import { APP_NAME } from '@/lib/constants'
import { requirePageSession } from '@/services/auth'
import { getConfig } from '@/services/config'
import { getSettingsRow } from '@/services/settings-store'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  let projectName = APP_NAME
  try {
    projectName = getSettingsRow()?.projectName.trim() || APP_NAME
  } catch {
    // A request before installation may not have created the settings table.
  }
  return {
    title: {
      default: projectName,
      template: `%s | ${projectName}`,
    },
  }
}

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await requirePageSession()
  return <AppShell projectName={getConfig().projectName}>{children}</AppShell>
}
