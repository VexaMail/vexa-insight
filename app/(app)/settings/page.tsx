import { SettingsConfigForm } from '@/components/settings'
import { getSettingsForAdmin } from '@/services/settings'

export default async function SettingsPage() {
  const settings = await getSettingsForAdmin()

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <SettingsConfigForm initialData={settings} />
    </div>
  )
}
