import { Input } from '@/components/ui'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountCredentialFields({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label
          htmlFor={imapAccountFieldId(index, 'username')}
          className="text-foreground text-xs font-medium"
        >
          Username
        </label>
        <Input
          id={imapAccountFieldId(index, 'username')}
          type="text"
          value={account.username}
          onChange={(e) => {
            onUpdate(index, { username: e.target.value })
          }}
          placeholder="user@example.com"
          className="bg-card border-border/50 text-xs"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor={imapAccountFieldId(index, 'password')}
          className="text-foreground text-xs font-medium"
        >
          Password / App Password
        </label>
        <Input
          id={imapAccountFieldId(index, 'password')}
          type="password"
          value={account.passwordNew ?? ''}
          onChange={(e) => {
            onUpdate(index, { passwordNew: e.target.value })
          }}
          placeholder={account.passwordMasked ? '••••••••' : 'Password'}
          className="bg-card border-border/50 text-xs"
          autoComplete="off"
        />
      </div>
    </div>
  )
}
