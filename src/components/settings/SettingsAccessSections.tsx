import type { SettingsAccessSectionsProps } from '@/types/settings'
import AdvancedSection from './AdvancedSection'
import ApiKeySection from './ApiKeySection'
import UpdateStatusSection from './UpdateStatusSection'

/** API key, instance updates and the advanced server options. */
export function SettingsAccessSections({
  apiKey,
  form,
  setForm,
  onCopyApiKey,
}: SettingsAccessSectionsProps) {
  return (
    <>
      <ApiKeySection apiKey={apiKey} onCopy={onCopyApiKey} />

      <UpdateStatusSection apiKey={apiKey} />

      <AdvancedSection
        corsOrigins={form.backendCorsOrigins}
        environment={
          form.environment as 'development' | 'staging' | 'production'
        }
        onCorsChange={(v) => {
          setForm((prev) => ({ ...prev, backendCorsOrigins: v }))
        }}
        onEnvironmentChange={(v) => {
          setForm((prev) => ({ ...prev, environment: v }))
        }}
      />
    </>
  )
}
