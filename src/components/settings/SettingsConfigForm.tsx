'use client'

import { useActiveSettingsSection } from '@/hooks/settings'
import type { SettingsConfigFormProps } from '@/types/settings'
import { useSettingsConfig } from '../../hooks/settings/useSettingsConfig'
import { SettingsFormSections } from './SettingsFormSections'
import { SettingsNotificationSections } from './SettingsNotificationSections'
import { SettingsSaveBar } from './SettingsSaveBar'
import { SettingsSectionChips } from './SettingsSectionChips'
import { SettingsSectionNav } from './SettingsSectionNav'

export default function SettingsConfigForm({
  className = '',
  initialData,
}: Readonly<SettingsConfigFormProps>) {
  const settings = useSettingsConfig(initialData)
  const activeId = useActiveSettingsSection()
  const { apiKey, saveStatus, message, handleSubmit } = settings

  return (
    <div
      className={`grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] ${className}`}
    >
      <SettingsSectionNav activeId={activeId} />
      <div className="min-w-0 space-y-4">
        <SettingsSectionChips activeId={activeId} />
        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
          className="space-y-4"
          aria-label="Instance settings"
        >
          <SettingsFormSections settings={settings} />

          <SettingsSaveBar
            saveStatus={saveStatus}
            message={message}
            canSave={apiKey.trim() !== ''}
          />
        </form>
        <SettingsNotificationSections />
      </div>
    </div>
  )
}
