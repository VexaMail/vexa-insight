'use client'

import { useImapAccountsSection } from '@/hooks/settings'
import { Mail } from 'lucide-react'
import { ImapAccountAddButton } from './ImapAccountAddButton'
import { ImapAccountRow } from './ImapAccountRow'
import { ImapAccountsEmpty } from './ImapAccountsEmpty'
import type { ImapAccountsSectionProps } from './ImapAccountsSectionProps'
import { SettingsSection } from './SettingsSection'

export default function ImapAccountsSection({
  accounts,
  apiKey,
  onUpdate,
  onAdd,
  onRemove,
  onTestConnection,
}: Readonly<ImapAccountsSectionProps>) {
  const { expandedIndices, toggleExpand, handleAdd } = useImapAccountsSection(
    accounts,
    onAdd,
  )

  return (
    <SettingsSection
      anchorId="mailboxes"
      wide
      headingId="settings-imap-heading"
      icon={<Mail />}
      title="Mailboxes"
      description="IMAP accounts that receive aggregate reports; ingestion reads each one."
      actions={
        <ImapAccountAddButton
          onClick={handleAdd}
          hasAccounts={accounts.length > 0}
        />
      }
    >
      <div className="space-y-2">
        {accounts.length === 0 ? <ImapAccountsEmpty /> : null}
        {accounts.map((acc, index) => (
          <ImapAccountRow
            key={acc.id ? acc.id : `new-${acc.server}-${acc.username}`}
            account={acc}
            apiKey={apiKey}
            index={index}
            isExpanded={expandedIndices.has(index)}
            onRemove={onRemove}
            onTestConnection={onTestConnection}
            onToggleExpand={toggleExpand}
            onUpdate={onUpdate}
            removable={accounts.length > 1}
          />
        ))}
      </div>
    </SettingsSection>
  )
}
