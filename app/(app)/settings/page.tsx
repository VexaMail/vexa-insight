import { SettingsConfigForm } from '@/components/settings'
import { PageContainer, PageHeader } from '@/components/shell'
import { requirePageSession } from '@/services/auth'
import { getSettingsForAdmin } from '@/services/settings'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'Settings' }

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await requirePageSession()
  if (session.user.role !== 'admin') redirect('/')

  const settings = getSettingsForAdmin()

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage ingestion configuration, integrations, and admin preferences."
      />
      <SettingsConfigForm initialData={settings} />
    </PageContainer>
  )
}
