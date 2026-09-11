import type { SettingsAccessSectionsProps } from '@/types/settings'
import ApiKeySection from './ApiKeySection'
import ImapAccountsSection from './ImapAccountsSection'
import UpdateStatusSection from './UpdateStatusSection'

/** Instance status, API key and the IMAP accounts that feed ingestion. */
export function SettingsAccessSections({
  apiKey,
  form,
  onImapUpdate,
  onImapAdd,
  onImapRemove,
  onTestConnection,
  onCopyApiKey,
}: SettingsAccessSectionsProps) {
  return (
    <>
      <UpdateStatusSection apiKey={apiKey} />

      <ApiKeySection apiKey={apiKey} onCopy={onCopyApiKey} />

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
