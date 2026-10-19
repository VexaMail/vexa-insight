import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountServerFields({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="min-w-0 sm:col-span-2">
        <label
          htmlFor={imapAccountFieldId(index, 'server')}
          className={SETTINGS_LABEL_CLASS_NAME}
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
          className={SETTINGS_INPUT_CLASS_NAME}
        />
      </div>
      <div className="min-w-0">
        <label
          htmlFor={imapAccountFieldId(index, 'port')}
          className={SETTINGS_LABEL_CLASS_NAME}
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
          className={SETTINGS_INPUT_CLASS_NAME}
        />
      </div>
    </div>
  )
}
