import { ImapAccountFields } from './ImapAccountFields'
import type { ImapAccountsFieldsetProps } from './ImapAccountsFieldsetProps'

export function ImapAccountsFieldset({
  imapAccounts,
  dispatch,
}: Readonly<ImapAccountsFieldsetProps>) {
  return (
    <fieldset className="space-y-4 rounded-md border border-zinc-200 p-4 dark:border-zinc-700">
      <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        IMAP accounts
      </legend>
      {imapAccounts.map((acc, index) => (
        <ImapAccountFields
          key={acc._id}
          account={acc}
          index={index}
          canRemove={imapAccounts.length > 1}
          dispatch={dispatch}
        />
      ))}
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'ADD_ACCOUNT' })
        }}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus-visible:outline-zinc-400"
      >
        Add another account
      </button>
    </fieldset>
  )
}
