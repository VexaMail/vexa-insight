'use client'

import { useImapAccountsSection } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { ImapAccountAddButton } from './ImapAccountAddButton'
import { ImapAccountRow } from './ImapAccountRow'
import type { ImapAccountsSectionProps } from './ImapAccountsSectionProps'
import { SettingsSectionHeader } from './SettingsSectionHeader'

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6"
      aria-labelledby="settings-imap-heading"
    >
      <SettingsSectionHeader
        headingId="settings-imap-heading"
        icon={<Mail className="h-4 w-4" />}
        iconClassName="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg"
        title="IMAP Accounts"
        description="Email accounts for fetching DMARC reports"
      />
      <div className="space-y-2">
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
        <ImapAccountAddButton onClick={handleAdd} />
      </div>
    </motion.section>
  )
}
