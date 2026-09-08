import { imapAccountFieldUpdater, imapInstallFieldId } from '@/utils/install'
import type { ImapAccountFieldsProps } from './ImapAccountFieldsProps'
import { ImapAccountLabelRow } from './ImapAccountLabelRow'
import { ImapAccountServerFields } from './ImapAccountServerFields'
import { InstallTextField } from './InstallTextField'

/** One IMAP account row of the installer form. */
export function ImapAccountFields({
  account,
  index,
  canRemove,
  dispatch,
}: ImapAccountFieldsProps) {
  return (
    <div className="space-y-3 rounded border border-zinc-100 p-3 dark:border-zinc-600">
      <ImapAccountLabelRow
        value={account.label}
        index={index}
        canRemove={canRemove}
        dispatch={dispatch}
      />
      <ImapAccountServerFields
        server={account.server}
        port={account.port}
        index={index}
        dispatch={dispatch}
      />
      <InstallTextField
        id={imapInstallFieldId('username', index)}
        label="Username"
        type="text"
        value={account.username}
        onChange={imapAccountFieldUpdater(dispatch, index, 'username')}
      />
      <InstallTextField
        id={imapInstallFieldId('password', index)}
        label="Password"
        type="password"
        autoComplete="off"
        value={account.password}
        onChange={imapAccountFieldUpdater(dispatch, index, 'password')}
      />
    </div>
  )
}
