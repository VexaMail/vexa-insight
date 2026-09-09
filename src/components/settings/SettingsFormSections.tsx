'use client'

import { SettingsAccessSections } from './SettingsAccessSections'
import type { SettingsFormSectionsProps } from './SettingsFormSectionsProps'
import { SettingsIngestionSections } from './SettingsIngestionSections'

/** The access and ingestion cards, wired to the settings form state. */
export function SettingsFormSections({ settings }: SettingsFormSectionsProps) {
  const { apiKey, form, setForm } = settings
  return (
    <>
      <SettingsAccessSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
        onImapUpdate={settings.handleImapUpdate}
        onImapAdd={settings.handleImapAdd}
        onImapRemove={settings.handleImapRemove}
        onTestConnection={(id) => {
          void settings.handleTestConnection(id)
        }}
        onCopyApiKey={settings.handleCopyApiKey}
        onGenerateNewApiKey={settings.handleGenerateNewApiKey}
      />

      <SettingsIngestionSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
      />
    </>
  )
}
