import { SettingsConfigForm } from '@/components/settings'
import { PageContainer, PageHeader } from '@/components/shell'
import { getSettingsForAdmin } from '@/services/settings'

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
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
