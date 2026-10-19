import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountCredentialFields({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="min-w-0">
        <label
          htmlFor={imapAccountFieldId(index, 'username')}
          className={SETTINGS_LABEL_CLASS_NAME}
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
          className={SETTINGS_INPUT_CLASS_NAME}
        />
      </div>
      <div className="min-w-0">
        <label
          htmlFor={imapAccountFieldId(index, 'password')}
          className={SETTINGS_LABEL_CLASS_NAME}
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
          className={SETTINGS_INPUT_CLASS_NAME}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
