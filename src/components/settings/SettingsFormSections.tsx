'use client'

import ImapAccountsSection from './ImapAccountsSection'
import { ProjectNameSection } from './ProjectNameSection'
import { SettingsAccessSections } from './SettingsAccessSections'
import type { SettingsFormSectionsProps } from './SettingsFormSectionsProps'
import { SettingsIngestionSections } from './SettingsIngestionSections'

/** Every settings section, in the order the section index lists them. */
export function SettingsFormSections({ settings }: SettingsFormSectionsProps) {
  const { apiKey, form, setForm } = settings
  return (
    <>
      <ProjectNameSection
        projectName={form.projectName}
        onProjectNameChange={(projectName) => {
          setForm((prev) => ({ ...prev, projectName }))
        }}
      />
      <ImapAccountsSection
        accounts={form.imapAccounts}
        apiKey={apiKey}
        onUpdate={settings.handleImapUpdate}
        onAdd={settings.handleImapAdd}
        onRemove={settings.handleImapRemove}
        onTestConnection={(id) => {
          void settings.handleTestConnection(id)
        }}
      />
      <SettingsIngestionSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
      />
      <SettingsAccessSections
        apiKey={apiKey}
        form={form}
        setForm={setForm}
        onCopyApiKey={settings.handleCopyApiKey}
      />
    </>
  )
}
