import { Input } from '@/components/ui'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountServerFields({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-1.5 sm:col-span-2">
        <label
          htmlFor={imapAccountFieldId(index, 'server')}
          className="text-foreground text-xs font-medium"
        >
          IMAP Server
        </label>
        <Input
          id={imapAccountFieldId(index, 'server')}
          type="text"
          value={account.server}
          onChange={(e) => {
            onUpdate(index, { server: e.target.value })
          }}
          placeholder="imap.example.com"
          className="bg-card border-border/50 text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor={imapAccountFieldId(index, 'port')}
          className="text-foreground text-xs font-medium"
        >
          Port
        </label>
        <Input
          id={imapAccountFieldId(index, 'port')}
          type="number"
          min={1}
          max={65535}
          value={account.port}
          onChange={(e) => {
            onUpdate(index, { port: parseInt(e.target.value, 10) || 993 })
          }}
          placeholder="993"
          className="bg-card border-border/50 text-xs"
        />
      </div>
    </div>
  )
}
