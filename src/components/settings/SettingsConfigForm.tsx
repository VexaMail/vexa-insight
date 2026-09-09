'use client'

import type { SettingsConfigFormProps } from '@/types/settings'
import { useSettingsConfig } from '../../hooks/settings/useSettingsConfig'
import { SettingsFormSections } from './SettingsFormSections'
import { SettingsSaveBar } from './SettingsSaveBar'

export default function SettingsConfigForm({
  className = '',
  initialData,
}: Readonly<SettingsConfigFormProps>) {
  const settings = useSettingsConfig(initialData)
  const { apiKey, saveStatus, message, handleSubmit } = settings

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className={`space-y-6 ${className}`}
    >
      <SettingsFormSections settings={settings} />

      <SettingsSaveBar
        saveStatus={saveStatus}
        message={message}
        canSave={apiKey.trim() !== ''}
      />
    </form>
  )
}
