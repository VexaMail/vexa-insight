import { Input } from '@/components/ui'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountLabelField({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={imapAccountFieldId(index, 'label')}
        className="text-foreground text-xs font-medium"
      >
        Account Label
      </label>
      <Input
        id={imapAccountFieldId(index, 'label')}
        type="text"
        value={account.label}
        onChange={(e) => {
          onUpdate(index, { label: e.target.value })
        }}
        placeholder="e.g. Primary Inbox"
        className="bg-card border-border/50 text-xs"
      />
    </div>
  )
}
