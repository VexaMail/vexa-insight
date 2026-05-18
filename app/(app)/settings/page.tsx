import { SettingsConfigForm } from '@/components/settings'
import { PageContainer, PageHeader } from '@/components/shell'
import { getSettingsForAdmin } from '@/services/settings'

export default async function SettingsPage() {
  const settings = await getSettingsForAdmin()

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
