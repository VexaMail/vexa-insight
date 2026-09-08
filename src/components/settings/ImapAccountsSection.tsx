'use client'

import { Button } from '@/components/ui'

import { useImapAccountsSection } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { Mail, Plus } from 'lucide-react'
import { ImapAccountRow } from './ImapAccountRow'
import type { ImapAccountsSectionProps } from './ImapAccountsSectionProps'

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
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg">
          <Mail className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-imap-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            IMAP Accounts
          </h2>
          <p className="text-muted-foreground text-xs">
            Email accounts for fetching DMARC reports
          </p>
        </div>
      </div>
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
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-primary text-xs"
          onClick={handleAdd}
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add another account
        </Button>
      </div>
    </motion.section>
  )
}
