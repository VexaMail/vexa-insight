'use client'

import type { SettingsConfigFormProps } from '@/types/settings'
import { useSettingsConfig } from '../../hooks/settings/useSettingsConfig'
import { SettingsAccessSections } from './SettingsAccessSections'
import { SettingsIngestionSections } from './SettingsIngestionSections'
import { SettingsSaveBar } from './SettingsSaveBar'

export default function SettingsConfigForm({
  className = '',
  initialData,
}: Readonly<SettingsConfigFormProps>) {
  const {
    apiKey,
    form,
    setForm,
    saveStatus,
    message,
    handleCopyApiKey,
    handleGenerateNewApiKey,
    handleTestConnection,
    handleImapUpdate,
    handleImapAdd,
    handleImapRemove,
    handleSubmit,
  } = useSettingsConfig(initialData)

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className={`space-y-6 ${className}`}
    >
      <SettingsAccessSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
        onImapUpdate={handleImapUpdate}
        onImapAdd={handleImapAdd}
        onImapRemove={handleImapRemove}
        onTestConnection={(id) => {
          void handleTestConnection(id)
        }}
        onCopyApiKey={handleCopyApiKey}
        onGenerateNewApiKey={handleGenerateNewApiKey}
      />

      <SettingsIngestionSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
      />

      <SettingsSaveBar
        saveStatus={saveStatus}
        message={message}
        canSave={apiKey.trim() !== ''}
      />
    </form>
  )
}
