import {
  INSTALL_INPUT_CLASS_NAME,
  INSTALL_LABEL_CLASS_NAME,
} from '@/constants/install'
import { imapAccountFieldUpdater, imapInstallFieldId } from '@/utils/install'
import type { ImapAccountLabelRowProps } from './ImapAccountLabelRowProps'

/** Label input of an IMAP account row, sharing its header with Remove. */
export function ImapAccountLabelRow({
  value,
  index,
  canRemove,
  dispatch,
}: ImapAccountLabelRowProps) {
  const id = imapInstallFieldId('label', index)

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className={INSTALL_LABEL_CLASS_NAME}>
          Label
        </label>
        {canRemove ? (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'REMOVE_ACCOUNT', index })
            }}
            className="text-danger focus-visible:ring-ring cursor-pointer rounded-sm text-sm hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Remove
          </button>
        ) : null}
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          imapAccountFieldUpdater(dispatch, index, 'label')(e.target.value)
        }}
        placeholder="e.g. Main account"
        className={INSTALL_INPUT_CLASS_NAME}
      />
    </>
  )
}
