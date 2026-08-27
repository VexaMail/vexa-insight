import { DEFAULT_IMAP_PORT } from '@/utils/install'

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
        <div
          key={acc._id}
          className="space-y-3 rounded border border-zinc-100 p-3 dark:border-zinc-600"
        >
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={`install-imap-label-${String(index)}`}
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Label
            </label>
            {imapAccounts.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'REMOVE_ACCOUNT', index })
                }}
                className="text-sm text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-red-400"
              >
                Remove
              </button>
            )}
          </div>
          <input
            id={`install-imap-label-${String(index)}`}
            type="text"
            value={acc.label}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_ACCOUNT',
                index,
                field: 'label',
                value: e.target.value,
              })
            }}
            placeholder="e.g. Main account"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`install-imap-server-${String(index)}`}
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Server
              </label>
              <input
                id={`install-imap-server-${String(index)}`}
                type="text"
                value={acc.server}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE_ACCOUNT',
                    index,
                    field: 'server',
                    value: e.target.value,
                  })
                }}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              />
            </div>
            <div>
              <label
                htmlFor={`install-imap-port-${String(index)}`}
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Port
              </label>
              <input
                id={`install-imap-port-${String(index)}`}
                type="number"
                min={1}
                max={65535}
                value={acc.port}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE_ACCOUNT',
                    index,
                    field: 'port',
                    value: parseInt(e.target.value, 10) || DEFAULT_IMAP_PORT,
                  })
                }}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor={`install-imap-username-${String(index)}`}
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id={`install-imap-username-${String(index)}`}
              type="text"
              value={acc.username}
              onChange={(e) => {
                dispatch({
                  type: 'UPDATE_ACCOUNT',
                  index,
                  field: 'username',
                  value: e.target.value,
                })
              }}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
            />
          </div>
          <div>
            <label
              htmlFor={`install-imap-password-${String(index)}`}
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id={`install-imap-password-${String(index)}`}
              type="password"
              value={acc.password}
              onChange={(e) => {
                dispatch({
                  type: 'UPDATE_ACCOUNT',
                  index,
                  field: 'password',
                  value: e.target.value,
                })
              }}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              autoComplete="off"
            />
          </div>
        </div>
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
