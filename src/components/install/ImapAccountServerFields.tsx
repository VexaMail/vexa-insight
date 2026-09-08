import {
  DEFAULT_IMAP_PORT,
  imapAccountFieldUpdater,
  imapInstallFieldId,
} from '@/utils/install'
import type { ImapAccountServerFieldsProps } from './ImapAccountServerFieldsProps'
import { InstallTextField } from './InstallTextField'

/** Server and port pair of an IMAP account row. */
export function ImapAccountServerFields({
  server,
  port,
  index,
  dispatch,
}: ImapAccountServerFieldsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <InstallTextField
        id={imapInstallFieldId('server', index)}
        label="Server"
        type="text"
        value={server}
        onChange={imapAccountFieldUpdater(dispatch, index, 'server')}
      />
      <InstallTextField
        id={imapInstallFieldId('port', index)}
        label="Port"
        type="number"
        min={1}
        max={65535}
        value={port}
        onChange={(value) => {
          dispatch({
            type: 'UPDATE_ACCOUNT',
            index,
            field: 'port',
            value: parseInt(value, 10) || DEFAULT_IMAP_PORT,
          })
        }}
      />
    </div>
  )
}
