import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { imapAccountFieldId } from '@/utils/settings'
import type { ImapAccountCredentialFieldsProps } from './ImapAccountCredentialFieldsProps'

export function ImapAccountLabelField({
  account,
  index,
  onUpdate,
}: Readonly<ImapAccountCredentialFieldsProps>) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={imapAccountFieldId(index, 'label')}
        className={SETTINGS_LABEL_CLASS_NAME}
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
        className={SETTINGS_INPUT_CLASS_NAME}
      />
    </div>
  )
}
