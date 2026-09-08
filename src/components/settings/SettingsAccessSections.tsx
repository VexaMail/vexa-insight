import type { SettingsAccessSectionsProps } from '@/types/settings'
import ApiKeySection from './ApiKeySection'
import ImapAccountsSection from './ImapAccountsSection'
import UpdateStatusSection from './UpdateStatusSection'

/** Instance status, API key and the IMAP accounts that feed ingestion. */
export function SettingsAccessSections({
  apiKey,
  form,
  setForm,
  onImapUpdate,
  onImapAdd,
  onImapRemove,
  onTestConnection,
  onCopyApiKey,
  onGenerateNewApiKey,
}: SettingsAccessSectionsProps) {
  return (
    <>
      <UpdateStatusSection apiKey={apiKey} />

      <ApiKeySection
        apiKey={apiKey}
        newKey={form.secretKeyNew}
        onCopy={onCopyApiKey}
        onGenerate={onGenerateNewApiKey}
        onNewKeyChange={(v) => {
          setForm((prev) => ({ ...prev, secretKeyNew: v }))
        }}
      />

      <ImapAccountsSection
        accounts={form.imapAccounts}
        apiKey={apiKey}
        onUpdate={onImapUpdate}
        onAdd={onImapAdd}
        onRemove={onImapRemove}
        onTestConnection={onTestConnection}
      />
    </>
  )
}
